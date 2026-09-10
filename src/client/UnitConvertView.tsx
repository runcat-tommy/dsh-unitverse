import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import type { ConvViewProps } from '@deepseek-ai/dsh-client-ui-conversation/client'
import type { LocaleId } from '@deepseek-ai/dsh-client-locale/client'
import type { TranslateNS } from '@deepseek-ai/dsh-client-ui-slots'
import { convertDetailed, UnitConversionError } from '../convert'
import { CATEGORIES, CATEGORY_ORDER, unitsByCategory, type CategoryId, type UnitDef } from '../units'
import { NS } from './locales'

/* --------------------------------------------------------------- contracts */

/** Minimal face of the injected locale service (`ctx.locale` satisfies it). */
export interface LocaleSource {
  getSnapshot(): { active: LocaleId }
  subscribe(fn: () => void): () => void
}

/** Business face injected at registration time (see `../index.tsx`). */
export interface UnitConvertViewInjected {
  /** Active-locale source: drives localized unit names and re-rendering. */
  locale: LocaleSource
}

/** Composed props this entry honors. */
export type UnitConvertViewProps =
  & ConvViewProps
  & { t: TranslateNS<typeof NS> }
  & UnitConvertViewInjected

/* ------------------------------------------------------------- persistence */

/**
 * One remembered conversion. Only ids are stored (never rendered text), so the
 * history re-renders in whatever language is active at read time.
 */
interface HistoryEntry {
  category: CategoryId
  value: string
  fromId: string
  toId: string
  delta: boolean
  ts: number
}

const HISTORY_KEY = 'dsh.unitverse.history.v1'
const HISTORY_MAX = 60
const HISTORY_SHOWN = 6

function isCategoryId(x: unknown): x is CategoryId {
  return typeof x === 'string' && (CATEGORY_ORDER as readonly string[]).includes(x)
}

function readHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((x): x is HistoryEntry => {
      if (typeof x !== 'object' || x === null) return false
      const e = x as HistoryEntry
      return isCategoryId(e.category)
        && typeof e.value === 'string'
        && typeof e.fromId === 'string'
        && typeof e.toId === 'string'
        && typeof e.ts === 'number'
    }).slice(0, HISTORY_MAX)
  } catch {
    return []
  }
}

function writeHistory(entries: HistoryEntry[]): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.slice(0, HISTORY_MAX)))
  } catch {
    /* storage unavailable: history stays in-memory */
  }
}

/* ---------------------------------------------------- per-category defaults */

/** Starting unit pair of each module (common and immediately useful). */
export const DEFAULTS: Record<CategoryId, readonly [string, string]> = {
  length: ['km', 'mi'],
  area: ['m2', 'mu'],
  volume: ['l', 'gal_us'],
  time: ['h', 'min'],
  angle: ['deg', 'rad'],
  speed: ['km_h', 'm_s'],
  temperature: ['celsius', 'fahrenheit'],
  pressure: ['atm', 'kpa'],
  energy: ['kcal', 'kj'],
  power: ['kw', 'hp'],
}

/* ---------------------------------------------------------------- styling */

const STYLE_ID = 'dsh-unitverse-view-css'

const CSS = `
.uc-root {
  --uc-brand: var(--dsw-alias-brand-primary, #4c8dff);
  --uc-label: var(--dsw-alias-label-primary, #e6e6e6);
  --uc-label-2: var(--dsw-alias-label-secondary, #c0c0c0);
  --uc-label-3: var(--dsw-alias-label-tertiary, #9a9a9a);
  --uc-dim: var(--dsw-alias-label-dimmed, #888);
  --uc-border: var(--dsw-alias-border-l1, #2e2e2e);
  --uc-border-2: var(--dsw-alias-border-l2, #3a3a3a);
  --uc-layer: var(--dsw-alias-bg-layer-1, #262626);
  --uc-layer-2: var(--dsw-alias-bg-layer-2, #303030);
  --uc-hover: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, .12));
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  padding: 20px 24px 40px;
  color: var(--uc-label);
  font-size: 13px;
  line-height: 20px;
}

.uc-head { display: flex; flex-direction: column; gap: 4px; }
.uc-title { font-size: 17px; line-height: 24px; font-weight: 650; letter-spacing: -.01em; }
.uc-sub { font-size: 12px; line-height: 18px; color: var(--uc-label-3); }

/* ---- module switcher ---- */
.uc-cats { display: flex; flex-wrap: wrap; gap: 8px; }
.uc-cat {
  height: 30px; padding: 0 13px; border-radius: 15px;
  border: 1px solid var(--uc-border-2); background: transparent;
  color: var(--uc-label-2); font-size: 12.5px; font-family: inherit; line-height: 28px;
  cursor: pointer; white-space: nowrap;
  transition: background .12s ease, border-color .12s ease, color .12s ease;
}
.uc-cat:hover { background: var(--uc-hover); color: var(--uc-label); }
.uc-cat[data-active="true"] {
  border-color: color-mix(in srgb, var(--uc-brand) 55%, transparent);
  background: color-mix(in srgb, var(--uc-brand) 14%, transparent);
  color: var(--uc-brand); font-weight: 600;
}
.uc-cat:focus-visible { outline: 2px solid color-mix(in srgb, var(--uc-brand) 60%, transparent); outline-offset: 2px; }

/* ---- cards ---- */
.uc-card {
  display: flex; flex-direction: column; gap: 14px;
  border: 1px solid var(--uc-border); border-radius: 12px;
  background: var(--uc-layer); padding: 16px;
}

/* ---- form ---- */
.uc-form { display: grid; grid-template-columns: minmax(110px, .9fr) minmax(0, 1.4fr) auto minmax(0, 1.4fr); gap: 12px; align-items: end; }
.uc-field { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.uc-label { font-size: 11px; line-height: 14px; color: var(--uc-label-3); }
.uc-input, .uc-select {
  box-sizing: border-box; width: 100%; height: 36px; padding: 0 11px;
  border: 1px solid var(--uc-border-2); border-radius: 9px;
  background: var(--uc-layer-2); color: var(--uc-label);
  font-size: 13.5px; font-family: inherit; line-height: 34px; outline: none;
  transition: border-color .12s ease, box-shadow .12s ease;
}
.uc-input::placeholder { color: var(--uc-dim); }
.uc-input:focus, .uc-select:focus {
  border-color: var(--uc-brand);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--uc-brand) 18%, transparent);
}
.uc-value { font-variant-numeric: tabular-nums; font-size: 15px; }
.uc-selectwrap { position: relative; display: block; min-width: 0; }
.uc-select { appearance: none; -webkit-appearance: none; padding-right: 30px; cursor: pointer; text-overflow: ellipsis; }
.uc-selectwrap::after {
  content: ""; position: absolute; right: 12px; top: 50%; width: 7px; height: 7px;
  border-right: 1.6px solid var(--uc-label-3); border-bottom: 1.6px solid var(--uc-label-3);
  transform: translateY(-70%) rotate(45deg); pointer-events: none;
}
.uc-swap {
  display: inline-flex; align-items: center; justify-content: center;
  width: 36px; height: 36px; border-radius: 9px;
  border: 1px solid var(--uc-border-2); background: var(--uc-layer-2);
  color: var(--uc-label-2); font-size: 15px; line-height: 1; cursor: pointer;
  transition: background .12s ease, color .12s ease, transform .18s ease;
}
.uc-swap:hover { background: var(--uc-hover); color: var(--uc-label); }
.uc-swap:active { transform: rotate(180deg); }
.uc-swap:focus-visible { outline: 2px solid color-mix(in srgb, var(--uc-brand) 60%, transparent); outline-offset: 2px; }

/* ---- options row (difference switch) ---- */
.uc-opts { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.uc-switch { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; user-select: none; color: var(--uc-label-2); font-size: 12.5px; }
.uc-switch input { position: absolute; opacity: 0; width: 0; height: 0; }
.uc-track {
  position: relative; flex: none; width: 32px; height: 18px; border-radius: 9px;
  background: var(--uc-border-2); transition: background .14s ease;
}
.uc-track::after {
  content: ""; position: absolute; top: 2px; left: 2px; width: 14px; height: 14px; border-radius: 50%;
  background: #fff; transition: transform .14s ease;
}
.uc-switch input:checked + .uc-track { background: var(--uc-brand); }
.uc-switch input:checked + .uc-track::after { transform: translateX(14px); }
.uc-switch input:focus-visible + .uc-track { box-shadow: 0 0 0 3px color-mix(in srgb, var(--uc-brand) 25%, transparent); }
.uc-switch-hint { font-size: 11.5px; line-height: 17px; color: var(--uc-label-3); }

/* ---- result hero ---- */
.uc-hero {
  display: flex; flex-direction: column; gap: 8px;
  border: 1px solid color-mix(in srgb, var(--uc-brand) 30%, var(--uc-border));
  border-radius: 12px; padding: 16px;
  background: color-mix(in srgb, var(--uc-brand) 7%, transparent);
}
.uc-hero-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.uc-hero-label { font-size: 11px; line-height: 14px; color: var(--uc-label-3); letter-spacing: .06em; text-transform: uppercase; }
.uc-ghost {
  border: none; background: transparent; padding: 2px 6px; border-radius: 6px;
  color: var(--uc-label-3); font-size: 11.5px; font-family: inherit; cursor: pointer;
  transition: background .12s ease, color .12s ease;
}
.uc-ghost:hover { background: var(--uc-hover); color: var(--uc-label); }
.uc-hero-value {
  font-size: 30px; line-height: 38px; font-weight: 650; letter-spacing: -.02em;
  font-variant-numeric: tabular-nums; word-break: break-all;
}
.uc-hero-unit { margin-left: 8px; font-size: 15px; font-weight: 500; color: var(--uc-label-2); }
.uc-hero-eq { font-size: 13px; line-height: 20px; color: var(--uc-label-2); word-break: break-word; }
.uc-badge {
  align-self: flex-start; padding: 2px 8px; border-radius: 6px;
  background: var(--uc-layer-2); color: var(--uc-label-3);
  font-size: 11px; line-height: 16px;
}

.uc-empty {
  border: 1px dashed var(--uc-border-2); border-radius: 12px;
  padding: 22px 16px; text-align: center; color: var(--uc-dim); font-size: 12.5px;
}

/* ---- error ---- */
.uc-error {
  display: flex; flex-direction: column; gap: 4px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary, #e5484d) 45%, transparent);
  border-radius: 12px; padding: 12px 14px;
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary, #e5484d) 9%, transparent);
}
.uc-error-title { font-size: 13px; font-weight: 600; color: var(--dsw-alias-state-error-primary, #e5484d); }

/* ---- history ---- */
.uc-hist { display: flex; flex-direction: column; gap: 10px; }
.uc-hist-head { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.uc-hist-title { font-size: 12.5px; font-weight: 600; color: var(--uc-label-2); }
.uc-hist-list { display: flex; flex-direction: column; gap: 6px; }
.uc-row {
  display: flex; align-items: center; gap: 10px; width: 100%;
  padding: 9px 11px; border: 1px solid var(--uc-border); border-radius: 9px;
  background: transparent; color: var(--uc-label-2);
  font-family: inherit; font-size: 12.5px; line-height: 18px;
  text-align: left; cursor: pointer;
  transition: background .12s ease, border-color .12s ease, color .12s ease;
}
.uc-row:hover { background: var(--uc-hover); border-color: var(--uc-border-2); color: var(--uc-label); }
.uc-row-eq { font-variant-numeric: tabular-nums; white-space: nowrap; }
.uc-row-names { color: var(--uc-label-3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.uc-row-time { flex: none; margin-left: auto; color: var(--uc-dim); font-size: 11px; font-variant-numeric: tabular-nums; }
.uc-hint { font-size: 11.5px; line-height: 17px; color: var(--uc-label-3); }

@media (max-width: 720px) {
  .uc-root { padding: 16px 14px 32px; }
  .uc-form { grid-template-columns: 1fr auto; }
  .uc-form .uc-field:first-child { grid-column: 1 / -1; }
  .uc-hero-value { font-size: 26px; line-height: 34px; }
}
`

function ensureStyle(): void {
  if (typeof document === 'undefined') return
  if (document.getElementById(STYLE_ID)) return
  const el = document.createElement('style')
  el.id = STYLE_ID
  el.setAttribute('data-plugin-css', 'dsh-unitverse')
  el.textContent = CSS
  document.head.appendChild(el)
}

/* --------------------------------------------------------------- component */

/**
 * Conversation view "单位换算 / Unit Converter".
 *
 * Category-first by design: the panel is split into ten independent modules
 * (length, area, volume, …) and a module only ever offers **its own** units, so
 * units are never mixed and a category mismatch cannot be produced from the UI.
 * Every string — including unit and category names — follows the active DSH
 * locale (zh / en), and the panel re-renders when that locale changes.
 */
export function UnitConvertView({ t, locale }: UnitConvertViewProps): JSX.Element {
  const subscribe = useCallback((onChange: () => void) => locale.subscribe(onChange), [locale])
  const getSnapshot = useCallback(() => locale.getSnapshot(), [locale])
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const lang: LocaleId = snapshot.active

  const [category, setCategory] = useState<CategoryId>('length')
  const [value, setValue] = useState('1')
  const [fromId, setFromId] = useState<string>(DEFAULTS.length[0])
  const [toId, setToId] = useState<string>(DEFAULTS.length[1])
  const [delta, setDelta] = useState(false)
  const [history, setHistory] = useState<HistoryEntry[]>(() => readHistory())
  const [copied, setCopied] = useState(false)

  /** Localized unit name (data from units.ts, selected by the active locale). */
  const unitName = useCallback(
    (unit: UnitDef): string => (lang === 'en' ? unit.nameEn : unit.nameZh),
    [lang],
  )

  /**
   * Localized display token. A few units (里 / 尺 / 亩) carry a symbol that is
   * itself Chinese; in the English UI those fall back to their English name so
   * no Chinese text can leak into an English interface.
   */
  const displayToken = useCallback((unit: UnitDef): string => {
    if (lang === 'en' && /[\u4e00-\u9fff]/.test(unit.symbol)) return unit.nameEn
    return unit.symbol
  }, [lang])

  /** `symbol · name`, collapsing to a single token when both coincide. */
  const optionLabel = useCallback((unit: UnitDef): string => {
    const token = displayToken(unit)
    const name = unitName(unit)
    return token === name ? name : `${token} · ${name}`
  }, [displayToken, unitName])

  const units = useMemo(() => unitsByCategory(category), [category])
  const fromUnit = units.find((u) => u.id === fromId) ?? units[0]
  const toUnit = units.find((u) => u.id === toId) ?? units[1] ?? units[0]
  const isTemperature = category === 'temperature'
  const prefix = isTemperature && delta ? 'Δ' : ''

  const result = useMemo(() => {
    if (value.trim() === '' || !Number.isFinite(Number(value)) || !fromUnit || !toUnit) return null
    try {
      return convertDetailed(Number(value), prefix + fromUnit.id, prefix + toUnit.id)
    } catch {
      return null
    }
  }, [value, prefix, fromUnit, toUnit])

  const error = useMemo(() => {
    if (!fromUnit || !toUnit || value.trim() === '') return null
    if (!Number.isFinite(Number(value))) return t('ui.errorBadValue')
    try {
      convertDetailed(Number(value), prefix + fromUnit.id, prefix + toUnit.id)
      return null
    } catch (err) {
      if (err instanceof UnitConversionError) {
        switch (err.kind) {
          case 'unknown-unit':
            return t('ui.errorUnknownUnit', { token: err.token ?? '' })
          case 'category-mismatch':
            return t('ui.errorCategoryMismatch', { from: unitName(fromUnit), to: unitName(toUnit) })
          case 'mixed-delta':
            return t('ui.errorMixedDelta')
          case 'bad-value':
            return t('ui.errorBadValue')
          default:
            return t('ui.errorGeneric', { message: err.message })
        }
      }
      return t('ui.errorGeneric', { message: err instanceof Error ? err.message : '' })
    }
  }, [value, prefix, fromUnit, toUnit, t, unitName])

  /** Remember the latest successful conversion (dedupes the same pair to the top). */
  const firstRun = useRef(true)
  const signature = result && fromUnit && toUnit ? `${value}|${prefix}${fromUnit.id}|${prefix}${toUnit.id}` : ''
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    if (!result || !fromUnit || !toUnit || value.trim() === '') return
    setHistory((prev) => {
      const entry: HistoryEntry = {
        category,
        value,
        fromId: fromUnit.id,
        toId: toUnit.id,
        delta: isTemperature && delta,
        ts: Date.now(),
      }
      const next = [
        entry,
        ...prev.filter((h) => !(h.value === value && h.fromId === fromUnit.id && h.toId === toUnit.id && h.delta === entry.delta)),
      ].slice(0, HISTORY_MAX)
      writeHistory(next)
      return next
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature])

  const pickCategory = (next: CategoryId) => {
    setCategory(next)
    const [f, s] = DEFAULTS[next]
    setFromId(f)
    setToId(s)
    setDelta(false)
    setCopied(false)
  }

  const onSwap = () => {
    setFromId(toId)
    setToId(fromId)
  }

  const onCopy = () => {
    if (!result || !fromUnit || !toUnit) return
    const text = `${value} ${displayToken(fromUnit)} = ${result.result} ${displayToken(toUnit)}`
    const pending = navigator.clipboard?.writeText(text)
    if (!pending) return
    void pending.then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    }).catch(() => {})
  }

  const rows = useMemo(() => {
    const list = unitsByCategory(category)
    return history
      .filter((h) => h.category === category)
      .slice(0, HISTORY_SHOWN)
      .map((h) => {
        const f = list.find((u) => u.id === h.fromId)
        const s = list.find((u) => u.id === h.toId)
        if (!f || !s) return null
        const p = h.delta ? 'Δ' : ''
        let out: string
        try {
          out = String(convertDetailed(Number(h.value), p + f.id, p + s.id).result)
        } catch {
          return null
        }
        return { key: `${h.ts}-${f.id}-${s.id}`, entry: h, from: f, to: s, out }
      })
      .filter((x): x is NonNullable<typeof x> => x !== null)
  }, [history, category])

  if (typeof window !== 'undefined') ensureStyle()

  const catLabel = lang === 'en' ? CATEGORIES[category].labelEn : CATEGORIES[category].labelZh
  const rowsOfCategory = history.filter((h) => h.category === category).length

  return (
    <div className="uc-root">
      <div className="uc-head">
        <span className="uc-title">{t('ui.title')}</span>
        <span className="uc-sub">{t('ui.subtitle')}</span>
      </div>

      {/* module switcher: one category at a time, units never mixed */}
      <div className="uc-cats" role="tablist" aria-label={t('ui.title')}>
        {CATEGORY_ORDER.map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            className="uc-cat"
            data-active={id === category}
            aria-selected={id === category}
            onClick={() => pickCategory(id)}
          >
            {t(`catTab.${id}`)}
          </button>
        ))}
      </div>

      <div className="uc-card">
        <div className="uc-form">
          <label className="uc-field">
            <span className="uc-label">{t('ui.value')}</span>
            <input
              className="uc-input uc-value"
              value={value}
              inputMode="decimal"
              placeholder={t('ui.valuePlaceholder')}
              onChange={(e) => setValue(e.target.value)}
            />
          </label>

          <label className="uc-field">
            <span className="uc-label">{t('ui.from')}</span>
            <span className="uc-selectwrap">
              <select className="uc-select" value={fromUnit?.id ?? ''} onChange={(e) => setFromId(e.target.value)}>
                {units.map((u) => (
                  <option key={u.id} value={u.id}>{optionLabel(u)}</option>
                ))}
              </select>
            </span>
          </label>

          <button type="button" className="uc-swap" title={t('ui.swap')} aria-label={t('ui.swap')} onClick={onSwap}>⇄</button>

          <label className="uc-field">
            <span className="uc-label">{t('ui.to')}</span>
            <span className="uc-selectwrap">
              <select className="uc-select" value={toUnit?.id ?? ''} onChange={(e) => setToId(e.target.value)}>
                {units.map((u) => (
                  <option key={u.id} value={u.id}>{optionLabel(u)}</option>
                ))}
              </select>
            </span>
          </label>
        </div>

        {isTemperature
          ? (
            <div className="uc-opts">
              <label className="uc-switch">
                <input type="checkbox" checked={delta} onChange={(e) => setDelta(e.target.checked)} />
                <span className="uc-track" />
                <span>{t('ui.delta')}</span>
              </label>
              {delta && <span className="uc-switch-hint">{t('ui.deltaHint')}</span>}
            </div>
          )
          : <div className="uc-hint">{t('ui.hint')}</div>}
      </div>

      {error
        ? (
          <div className="uc-error" role="alert">
            <span className="uc-error-title">{error}</span>
          </div>
        )
        : result && fromUnit && toUnit
          ? (
            <div className="uc-hero">
              <div className="uc-hero-top">
                <span className="uc-hero-label">{t('ui.result')}</span>
                <button type="button" className="uc-ghost" onClick={onCopy}>
                  {copied ? t('ui.copied') : t('ui.copy')}
                </button>
              </div>
              <div className="uc-hero-value">
                {result.result}
                <span className="uc-hero-unit">{displayToken(toUnit)}</span>
              </div>
              <div className="uc-hero-eq">
                {value} {unitName(fromUnit)} = {result.result} {unitName(toUnit)}
              </div>
              <span className="uc-badge">{t('ui.categoryLabel')}: {catLabel}</span>
            </div>
          )
          : <div className="uc-empty">{t('ui.emptyResult')}</div>}

      <div className="uc-hist">
        <div className="uc-hist-head">
          <span className="uc-hist-title">{t('ui.history')}</span>
          {rowsOfCategory > 0 && (
            <button
              type="button"
              className="uc-ghost"
              onClick={() => {
                setHistory((prev) => {
                  const next = prev.filter((h) => h.category !== category)
                  writeHistory(next)
                  return next
                })
              }}
            >
              {t('ui.clear')}
            </button>
          )}
        </div>
        {rows.length === 0
          ? <div className="uc-empty">{t('ui.historyEmpty')}</div>
          : (
            <div className="uc-hist-list">
              {rows.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  className="uc-row"
                  onClick={() => {
                    setCategory(r.entry.category)
                    setValue(r.entry.value)
                    setFromId(r.from.id)
                    setToId(r.to.id)
                    setDelta(r.entry.delta)
                  }}
                >
                  <span className="uc-row-eq">{r.entry.value} {displayToken(r.from)} = {r.out} {displayToken(r.to)}</span>
                  <span className="uc-row-names">{unitName(r.from)} → {unitName(r.to)}</span>
                  <span className="uc-row-time">{new Date(r.entry.ts).toLocaleTimeString()}</span>
                </button>
              ))}
            </div>
          )}
      </div>
    </div>
  )
}

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ConvViewProps } from '@deepseek-ai/dsh-client-ui-conversation/client'
import { convertDetailed, UnitConversionError } from '../convert'
import { UNITS } from '../units'

/* ------------------------------------------------------------------ types */

interface HistoryEntry {
  /** User-facing input, e.g. `100`. */
  value: string
  /** User-facing source token, e.g. `km` or `千米`. */
  from: string
  /** User-facing target token. */
  to: string
  /** One-line result, e.g. `100 km = 62.13711922 mi (长度)`. */
  summary: string
  ts: number
}

const HISTORY_KEY = 'dsh.unit-conversion.history.v1'
const HISTORY_MAX = 20

/* ------------------------------------------------------------------ utils */

function readHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (x): x is HistoryEntry =>
        typeof x === 'object' && x !== null
        && typeof (x as HistoryEntry).value === 'string'
        && typeof (x as HistoryEntry).from === 'string'
        && typeof (x as HistoryEntry).to === 'string'
        && typeof (x as HistoryEntry).summary === 'string',
    ).slice(0, HISTORY_MAX)
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

/* ----------------------------------------------------------------- styles */

const STYLE_ID = 'dsh-unit-conversion-view-css'

const CSS = `
.uc-root { display: flex; flex-direction: column; gap: 14px; padding: 4px 2px; min-width: 0; }
.uc-head { display: flex; flex-direction: column; gap: 2px; }
.uc-title { font-size: 15px; line-height: 22px; font-weight: 600; color: var(--dsw-alias-label-primary, #e6e6e6); }
.uc-sub { font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-tertiary, #9a9a9a); }
.uc-row { display: flex; flex-direction: row; align-items: center; gap: 8px; flex-wrap: wrap; }
.uc-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.uc-label { font-size: 11px; line-height: 14px; color: var(--dsw-alias-label-tertiary, #9a9a9a); }
.uc-input { box-sizing: border-box; height: 32px; padding: 0 10px; border: 1px solid var(--dsw-alias-border-l2, #3a3a3a); border-radius: 8px; background: var(--dsw-alias-bg-layer-1, #262626); color: var(--dsw-alias-label-primary, #e6e6e6); font-size: 13px; line-height: 20px; outline: none; min-width: 120px; }
.uc-input:focus { border-color: var(--dsw-alias-brand-primary, #4c8dff); }
.uc-input::placeholder { color: var(--dsw-alias-label-dimmed, #777); }
.uc-value { width: 150px; }
.uc-token { flex: 1; min-width: 140px; }
.uc-swap { flex: none; width: 30px; height: 30px; border: 1px solid var(--dsw-alias-border-l2, #3a3a3a); border-radius: 8px; background: transparent; color: var(--dsw-alias-label-secondary, #c0c0c0); font-size: 14px; line-height: 1; cursor: pointer; }
.uc-swap:hover { background: var(--dsw-alias-interactive-bg-hover, rgba(255,255,255,0.06)); }
.uc-result { display: flex; flex-direction: column; gap: 4px; padding: 10px 12px; border: 1px solid var(--dsw-alias-border-l1, #2e2e2e); border-radius: 10px; background: var(--dsw-alias-bg-layer-1, #262626); }
.uc-result-summary { font-size: 16px; line-height: 24px; font-weight: 600; color: var(--dsw-alias-label-primary, #e6e6e6); word-break: break-all; }
.uc-result-cat { font-size: 11px; line-height: 14px; color: var(--dsw-alias-label-tertiary, #9a9a9a); }
.uc-error { padding: 8px 12px; border: 1px solid var(--dsw-alias-state-error-primary, #d64545); border-radius: 8px; background: color-mix(in srgb, var(--dsw-alias-state-error-primary, #d64545) 12%, transparent); color: var(--dsw-alias-state-error-primary, #e5484d); font-size: 12px; line-height: 18px; }
.uc-hist { display: flex; flex-direction: column; gap: 6px; }
.uc-hist-head { display: flex; align-items: center; justify-content: space-between; }
.uc-hist-title { font-size: 12px; font-weight: 600; color: var(--dsw-alias-label-secondary, #c0c0c0); }
.uc-hist-clear { border: none; background: transparent; color: var(--dsw-alias-label-tertiary, #9a9a9a); font-size: 11px; cursor: pointer; padding: 2px 4px; }
.uc-hist-clear:hover { color: var(--dsw-alias-label-primary, #e6e6e6); }
.uc-hist-item { display: flex; flex-direction: row; align-items: center; gap: 8px; padding: 6px 10px; border: 1px solid var(--dsw-alias-border-l1, #2e2e2e); border-radius: 8px; background: transparent; color: var(--dsw-alias-label-secondary, #c0c0c0); font-size: 12px; line-height: 18px; text-align: left; cursor: pointer; word-break: break-all; }
.uc-hist-item:hover { background: var(--dsw-alias-interactive-bg-hover, rgba(255,255,255,0.06)); color: var(--dsw-alias-label-primary, #e6e6e6); }
.uc-hist-time { flex: none; margin-left: auto; color: var(--dsw-alias-label-dimmed, #777); font-size: 11px; }
.uc-empty { color: var(--dsw-alias-label-dimmed, #777); font-size: 12px; }
.uc-hint { color: var(--dsw-alias-label-tertiary, #9a9a9a); font-size: 11px; line-height: 16px; }
`

function ensureStyle(): void {
  if (typeof document === 'undefined') return
  if (document.getElementById(STYLE_ID)) return
  const el = document.createElement('style')
  el.id = STYLE_ID
  el.textContent = CSS
  document.head.appendChild(el)
}

/* ------------------------------------------------------------ error copy */

function errorText(err: unknown): string {
  if (err instanceof UnitConversionError) {
    switch (err.kind) {
      case 'unknown-unit':
        return `未知单位：${err.message}（支持中英文单位，如 km/kilometer/千米/公里；也接受符号写法）`
      case 'category-mismatch':
        return `无法换算：${err.message}（两个单位不属于同一类别）`
      case 'bad-value':
        return `数值无效：${err.message}`
      case 'mixed-delta':
        return `温差写法不一致：${err.message}（请同时在两个单位前加 Δ，或都不加）`
      default:
        return `换算失败：${err.message}`
    }
  }
  return err instanceof Error ? `换算失败：${err.message}` : '换算失败，请检查输入'
}

/* ------------------------------------------------------------ component */

/**
 * Conversation view tab "单位换算": a pure in-browser unit converter with a
 * persistent recent-history list. Rendered by the conversation session body
 * whenever this view tab is active (see register in ../index.tsx).
 */
export function UnitConvertView(_props: ConvViewProps): JSX.Element {
  const [value, setValue] = useState('1')
  const [from, setFrom] = useState('km')
  const [to, setTo] = useState('mi')
  const [history, setHistory] = useState<HistoryEntry[]>(() => readHistory())

  /** Every unit's suggested spellings: symbol, Chinese name and English name. */
  const suggestions = useMemo(() => {
    const seen = new Set<string>()
    const options: string[] = []
    for (const unit of UNITS) {
      for (const token of [unit.symbol, unit.nameZh, unit.nameEn]) {
        if (token && !seen.has(token)) {
          seen.add(token)
          options.push(token)
        }
      }
    }
    return options
  }, [])

  const result = useMemo(() => {
    const v = Number(value)
    if (value.trim() === '' || !Number.isFinite(v)) return null
    try {
      return convertDetailed(v, from, to)
    } catch (err) {
      return null
    }
  }, [value, from, to])

  const error = useMemo(() => {
    if (value.trim() === '') return null
    if (!Number.isFinite(Number(value))) return '请输入有效的数值'
    try {
      convertDetailed(Number(value), from, to)
      return null
    } catch (err) {
      return errorText(err)
    }
  }, [value, from, to])

  const onSwap = () => {
    setFrom(to)
    setTo(from)
  }

  const commitHistory = (summary: string) => {
    if (value.trim() === '' || summary === '') return
    setHistory((prev) => {
      const entry: HistoryEntry = { value, from, to, summary, ts: Date.now() }
      const next = [entry, ...prev.filter((h) => !(h.value === value && h.from === from && h.to === to))].slice(0, HISTORY_MAX)
      writeHistory(next)
      return next
    })
  }

  /** Record every successful conversion (dedupes same value/from/to to the top). */
  const firstRun = useRef(true)
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    if (result && result.summary) commitHistory(result.summary)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result?.summary])

  const onClear = () => {
    setHistory([])
    writeHistory([])
  }

  const onPick = (entry: HistoryEntry) => {
    setValue(entry.value)
    setFrom(entry.from)
    setTo(entry.to)
  }

  const categoryText = result
    ? `${result.categoryZh}（${result.categoryEn}）`
    : ''

  if (typeof window !== 'undefined') ensureStyle()

  return (
    <div className="uc-root">
      <div className="uc-head">
        <span className="uc-title">单位换算</span>
        <span className="uc-sub">支持 10 大类共 80+ 常用单位；单位名可用英文符号、英文全称或中文（km/kilometer/千米/公里 均可）。温度默认按绝对温标换算，温差请写成 Δ°C、Δ°F 形式。</span>
      </div>

      <div className="uc-row">
        <div className="uc-field">
          <span className="uc-label">数值</span>
          <input
            className="uc-input uc-value"
            value={value}
            placeholder="数值"
            inputMode="decimal"
            onChange={(e) => setValue(e.target.value)}
            aria-label="数值"
          />
        </div>
        <div className="uc-field" style={{ flex: '1 1 0' }}>
          <span className="uc-label">源单位</span>
          <input
            className="uc-input uc-token"
            value={from}
            list="uc-unit-suggestions"
            placeholder="如 km、千米、mile"
            onChange={(e) => setFrom(e.target.value)}
            aria-label="源单位"
          />
        </div>
        <button className="uc-swap" onClick={onSwap} title="交换单位" aria-label="交换单位">⇄</button>
        <div className="uc-field" style={{ flex: '1 1 0' }}>
          <span className="uc-label">目标单位</span>
          <input
            className="uc-input uc-token"
            value={to}
            list="uc-unit-suggestions"
            placeholder="如 mi、英里"
            onChange={(e) => setTo(e.target.value)}
            aria-label="目标单位"
          />
        </div>
      </div>

      <datalist id="uc-unit-suggestions">
        {suggestions.map((token) => <option key={token} value={token} />)}
      </datalist>

      <div className="uc-hint">示例：25 °C → °F 得 77；1 Δ°C → Δ°F 得 1.8；100 公里 → 英里。</div>

      {error
        ? <div className="uc-error" role="alert">{error}</div>
        : result
          ? (
            <div className="uc-result">
              <span className="uc-result-summary">{result.summary}</span>
              {categoryText && <span className="uc-result-cat">类别：{categoryText}</span>}
            </div>
          )
          : <div className="uc-empty">输入数值与单位后显示结果</div>}

      <div className="uc-hist">
        <div className="uc-hist-head">
          <span className="uc-hist-title">最近换算</span>
          {history.length > 0 && (
            <button className="uc-hist-clear" onClick={onClear}>清空</button>
          )}
        </div>
        {history.length === 0
          ? <span className="uc-empty">暂无记录。每次有效的换算会自动存入（本地浏览器）。</span>
          : history.map((h) => (
            <button key={`${h.ts}-${h.from}-${h.to}`} className="uc-hist-item" onClick={() => onPick(h)}>
              <span>{h.summary}</span>
              <span className="uc-hist-time">{new Date(h.ts).toLocaleTimeString()}</span>
            </button>
          ))}
      </div>
    </div>
  )
}

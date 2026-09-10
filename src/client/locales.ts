/**
 * Browser-side locale dictionaries for the unitverse view.
 *
 * The key set is deliberately a FINITE union: `catTab.${CategoryId}` expands
 * over the literal category ids, so a missing or extra key in either dictionary
 * is a compile error (`LocaleDictOf` checks both dictionaries against this
 * union at registration time). Copy can therefore never ship half-translated.
 *
 * Unit display names are NOT here: they are data owned by `src/units.ts`
 * (`nameZh` / `nameEn`) and are picked from the active locale at render time,
 * which keeps one source of truth for every unit and category name.
 */
import type { CategoryId } from '../units'

/** Dictionary namespace owned by this client plugin. */
export const NS = 'unitverse'

/** The dictionary key set (source of truth for both locales). */
export type UnitConversionKey =
  // view surface
  | 'view.tab'
  | 'view.aria'
  // panel copy
  | 'ui.title'
  | 'ui.subtitle'
  | 'ui.value'
  | 'ui.valuePlaceholder'
  | 'ui.from'
  | 'ui.to'
  | 'ui.swap'
  | 'ui.delta'
  | 'ui.deltaHint'
  | 'ui.result'
  | 'ui.copy'
  | 'ui.copied'
  | 'ui.hint'
  | 'ui.emptyResult'
  | 'ui.history'
  | 'ui.historyEmpty'
  | 'ui.clear'
  | 'ui.categoryLabel'
  // errors ({token} / {from} / {to} / {message} are template params)
  | 'ui.errorUnknownUnit'
  | 'ui.errorCategoryMismatch'
  | 'ui.errorMixedDelta'
  | 'ui.errorBadValue'
  | 'ui.errorGeneric'
  // one module tab per category
  | `catTab.${CategoryId}`

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** The unitverse conversation view tab label and panel copy. */
    'unitverse': UnitConversionKey
  }
}

/** Simplified Chinese dictionary. */
export const zh: Record<UnitConversionKey, string> = {
  'view.tab': '单位换算',
  'view.aria': '打开单位换算视图',

  'ui.title': '单位换算',
  'ui.subtitle': '先选择换算类别，再在该类别的单位之间换算。',
  'ui.value': '数值',
  'ui.valuePlaceholder': '输入数值',
  'ui.from': '源单位',
  'ui.to': '目标单位',
  'ui.swap': '交换单位',
  'ui.delta': '温差 Δ',
  'ui.deltaHint': '温差模式：结果表示温度差值，而不是绝对温度。',
  'ui.result': '换算结果',
  'ui.copy': '复制',
  'ui.copied': '已复制',
  'ui.hint': '输入数值并选择单位，结果即时显示。',
  'ui.emptyResult': '输入数值后显示结果',
  'ui.history': '本类别最近换算',
  'ui.historyEmpty': '暂无记录',
  'ui.clear': '清空',
  'ui.categoryLabel': '类别',

  'ui.errorUnknownUnit': '未知单位：{token}',
  'ui.errorCategoryMismatch': '“{from}”与“{to}”不属于同一类别，无法换算',
  'ui.errorMixedDelta': '温差单位（Δ）不能与绝对温度单位混用',
  'ui.errorBadValue': '请输入有效的数值',
  'ui.errorGeneric': '换算失败：{message}',

  'catTab.length': '长度换算',
  'catTab.area': '面积换算',
  'catTab.volume': '体积换算',
  'catTab.time': '时间换算',
  'catTab.angle': '角度换算',
  'catTab.speed': '速度换算',
  'catTab.temperature': '温度换算',
  'catTab.pressure': '压力换算',
  'catTab.energy': '热量换算',
  'catTab.power': '功率换算',
}

/** English dictionary. */
export const en: Record<UnitConversionKey, string> = {
  'view.tab': 'Unit Converter',
  'view.aria': 'Open the unit converter view',

  'ui.title': 'Unit Converter',
  'ui.subtitle': 'Pick a category first, then convert between that category’s units.',
  'ui.value': 'Value',
  'ui.valuePlaceholder': 'Enter a value',
  'ui.from': 'From',
  'ui.to': 'To',
  'ui.swap': 'Swap units',
  'ui.delta': 'Difference Δ',
  'ui.deltaHint': 'Difference mode: the result is a temperature interval, not an absolute temperature.',
  'ui.result': 'Result',
  'ui.copy': 'Copy',
  'ui.copied': 'Copied',
  'ui.hint': 'Enter a value and pick units — the result updates instantly.',
  'ui.emptyResult': 'The result appears here',
  'ui.history': 'Recent in this category',
  'ui.historyEmpty': 'No conversions yet',
  'ui.clear': 'Clear',
  'ui.categoryLabel': 'Category',

  'ui.errorUnknownUnit': 'Unknown unit: {token}',
  'ui.errorCategoryMismatch': '“{from}” and “{to}” are not in the same category',
  'ui.errorMixedDelta': 'A Δ difference unit cannot be mixed with an absolute temperature',
  'ui.errorBadValue': 'Enter a valid number',
  'ui.errorGeneric': 'Conversion failed: {message}',

  'catTab.length': 'Length',
  'catTab.area': 'Area',
  'catTab.volume': 'Volume',
  'catTab.time': 'Time',
  'catTab.angle': 'Angle',
  'catTab.speed': 'Speed',
  'catTab.temperature': 'Temperature',
  'catTab.pressure': 'Pressure',
  'catTab.energy': 'Heat / Energy',
  'catTab.power': 'Power',
}

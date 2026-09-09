/**
 * Browser-side locale dictionaries for the unit-conversion view tab.
 * The namespace is merged into the DSH slot locale map (module augmentation),
 * exactly like the built-in `trajectory` namespace.
 */

/** Dictionary namespace owned by this client plugin. */
export const NS = 'unit-conversion'

/** The dictionary key set (source of truth for both locales). */
export type UnitConversionKey = 'view.tab' | 'view.aria'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** The unit-conversion conversation view tab label. */
    'unit-conversion': UnitConversionKey
  }
}

/** Simplified Chinese dictionary. */
export const zh: Record<UnitConversionKey, string> = {
  'view.tab': '单位换算',
  'view.aria': '打开单位换算视图',
}

/** English dictionary. */
export const en: Record<UnitConversionKey, string> = {
  'view.tab': 'Unit Converter',
  'view.aria': 'Open the unit converter view',
}

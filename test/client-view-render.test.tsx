import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { UnitConvertView } from '../src/client/UnitConvertView'
import { en, zh, type UnitConversionKey } from '../src/client/locales'

/**
 * Rendered-output checks for the two product requirements that are easy to
 * regress and hard to see in types:
 *
 *  1. modules never mix categories (the default Length module must not mention
 *     units of any other category);
 *  2. the panel follows the DSH UI language completely — in the English UI not
 *     a single Chinese character may appear (unit names AND unit symbols such
 *     as 里 / 尺 / 亩 have to fall back to their English names).
 *
 * Rendered with react-dom/server, so no browser is required.
 */

const CJK = /[\u4e00-\u9fff]/

function render(lang: 'zh' | 'en'): string {
  const dict = (lang === 'en' ? en : zh) as Record<string, string>
  // Minimal stand-in for the framework's namespace-bound translate: it resolves
  // the real dictionaries and expands {param} templates like the runtime does.
  const t = (key: UnitConversionKey, params?: Record<string, unknown>): string => {
    let text = dict[key] ?? key
    for (const [name, value] of Object.entries(params ?? {})) {
      text = text.split(`{${name}}`).join(String(value))
    }
    return text
  }
  const locale = {
    getSnapshot: () => ({ active: lang }),
    subscribe: () => () => {},
  }
  const props = { t, locale } as unknown as Parameters<typeof UnitConvertView>[0]
  return renderToStaticMarkup(createElement(UnitConvertView, props))
}

describe('unit-conversion view rendering', () => {
  it('renders the Chinese UI in Chinese, including unit names', () => {
    const html = render('zh')
    expect(html).toContain('单位换算')
    expect(html).toContain('长度换算')
    expect(html).toContain('km · 千米')
    expect(html).toContain('千米')
    expect(html).toContain('英里')
    // default module result line: 1 km -> mi
    expect(html).toContain('0.6213711922')
  })

  it('renders the English UI entirely in English (no Chinese left over)', () => {
    const html = render('en')
    expect(html).toContain('Unit Converter')
    expect(html).toContain('Length')
    expect(html).toContain('km · kilometer')
    expect(html).toContain('mile')
    // The strong guarantee: an English UI must not leak any Chinese text
    // (this covers Chinese unit names, Chinese icons and Chinese-only symbols
    // such as 里 / 尺 / 亩, which fall back to their English names).
    expect(html).not.toMatch(CJK)
  })

  it('never mixes categories: the Length module offers length units only', () => {
    for (const lang of ['zh', 'en'] as const) {
      const html = render(lang)
      if (lang === 'zh') {
        expect(html).toContain('英寸') // inch — a length unit
        expect(html).not.toContain('摄氏度') // °C — temperature must not appear
        expect(html).not.toContain('千瓦') // kW — power must not appear
      } else {
        expect(html).toContain('inch')
        expect(html).not.toContain('degree Celsius')
        expect(html).not.toContain('kilowatt')
      }
    }
  })

  it('offers every category as its own module tab', () => {
    const zhHtml = render('zh')
    for (const tab of ['长度换算', '面积换算', '体积换算', '时间换算', '角度换算', '速度换算', '温度换算', '压力换算', '热量换算', '功率换算']) {
      expect(zhHtml, `missing tab ${tab}`).toContain(tab)
    }
    const enHtml = render('en')
    for (const tab of ['Length', 'Area', 'Volume', 'Time', 'Angle', 'Speed', 'Temperature', 'Pressure', 'Heat / Energy', 'Power']) {
      expect(enHtml, `missing tab ${tab}`).toContain(tab)
    }
  })
})

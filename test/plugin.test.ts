import { describe, expect, it, vi } from 'vitest'
import { apply, name, inject } from '../src/index'

function makeCtx() {
  const register = vi.fn((def: unknown) => () => {})
  const ctx = { tools: { register } } as never
  return { ctx, register }
}

type ToolDef = {
  name: string
  description: string
  parameters: {
    type: 'object'
    properties: Record<string, unknown>
    required?: string[]
  }
  output: {
    schema: Record<string, unknown>
    render(args: unknown, value: { summary: string }): { type: string; text: string }[]
  }
  execute(args: { value: number; from: string; to: string }): Promise<{
    result: number
    summary: string
    category: string
  }>
}

describe('plugin entry', () => {
  it('exposes plugin identity for Cordis', () => {
    expect(name).toBe('unitverse')
    expect(inject).toContain('tools')
  })

  it('registers exactly one tool named convert on apply', () => {
    const { ctx, register } = makeCtx()
    apply(ctx)
    expect(register).toHaveBeenCalledTimes(1)
    const def = register.mock.calls[0]![0] as ToolDef
    expect(def.name).toBe('convert')
    expect(def.description).toContain('ten categories')
    expect(def.parameters.type).toBe('object')
    expect(def.parameters.required).toEqual(['value', 'from', 'to'])
    expect(Object.keys(def.parameters.properties)).toEqual(['value', 'from', 'to'])
  })

  it('executes a conversion through the tool definition', async () => {
    const { ctx, register } = makeCtx()
    apply(ctx)
    const def = register.mock.calls[0]![0] as ToolDef
    const result = await def.execute({ value: 100, from: 'km', to: 'mi' })
    expect(result.result).toBeCloseTo(62.13711922)
    expect(result.category).toBe('length')
    expect(result.summary).toContain('100 km')

    const blocks = def.output.render({ value: 100, from: 'km', to: 'mi' }, result)
    expect(blocks[0]).toEqual({ type: 'text', text: result.summary })
  })

  it('declares every key that execute() returns in the output schema', async () => {
    const { ctx, register } = makeCtx()
    apply(ctx)
    const def = register.mock.calls[0]![0] as ToolDef
    const schema = def.output.schema as {
      additionalProperties?: boolean
      properties: Record<string, unknown>
      required?: string[]
    }
    const value = await def.execute({ value: 100, from: 'km', to: 'mi' })

    // `additionalProperties: false` makes the host reject any returned key the
    // schema does not declare, so schema and result must stay in lockstep.
    expect(schema.additionalProperties).toBe(false)
    const declared = Object.keys(schema.properties).sort()
    const returned = Object.keys(value).sort()
    expect(returned.filter((key) => !declared.includes(key))).toEqual([])
    expect(declared).toEqual(returned)
    expect(schema.required?.slice().sort()).toEqual(declared)
  })

  it('supports Chinese units through the tool definition', async () => {
    const { ctx, register } = makeCtx()
    apply(ctx)
    const def = register.mock.calls[0]![0] as ToolDef
    const result = await def.execute({ value: 100, from: '千米', to: '英里' })
    expect(result.result).toBeCloseTo(62.13711922)
    expect(result.summary).toContain('千米')
    expect(result.summary).toContain('英里')
  })

  it('propagates conversion errors from the tool', async () => {
    const { ctx, register } = makeCtx()
    apply(ctx)
    const def = register.mock.calls[0]![0] as ToolDef
    await expect(def.execute({ value: 1, from: 'm', to: 's' })).rejects.toThrowError(/cannot convert/)
  })
})

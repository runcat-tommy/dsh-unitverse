/**
 * Browser half of dsh-unit-conversion: a DSH client module that registers the
 * conversation view tab "单位换算 / Unit Converter" (next to 对话 / 轨迹).
 * Loaded by the web runtime through the package `dsh.client` declaration;
 * not meant for direct import.
 */
import type { Context } from '@deepseek-ai/cordis'
/** Cordis service names this client plugin waits for. */
export declare const inject: readonly ['slots', 'locale']
export declare function apply(ctx: Context): void

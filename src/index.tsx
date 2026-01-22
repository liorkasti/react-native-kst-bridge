import KstRnBackwardArchCompt from './NativeKstRnBackwardArchCompt';

export function multiply(a: number, b: number): number {
  return KstRnBackwardArchCompt.multiply(a, b);
}

export { default as KstRnBackwardArchComptView } from './KstRnBackwardArchComptViewNativeComponent';
export type { NativeProps as KstRnBackwardArchComptViewProps } from './KstRnBackwardArchComptViewNativeComponent';

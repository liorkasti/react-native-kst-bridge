import { NativeModules, Platform } from 'react-native';
import type { Spec } from './NativeKstBridge';

const LINKING_ERROR =
  `The package 'react-native-kst-bridge' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const KstBridgeModule = isTurboModuleEnabled
  ? require('./NativeKstBridge').default
  : NativeModules.KstBridge;

const KstBridge: Spec = KstBridgeModule
  ? KstBridgeModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export const {
  multiply,
  getOBject,
  getNumbers,
  callMeLater,
  promiseNumber,
  reverseString,
} = KstBridge;

// Export Fabric View Component
export { KSTFabricView } from './KSTFabricView';
export type { KSTFabricViewProps } from './KSTFabricView';

// Export EventEmitter
export { default as KSTEventEmitter } from './KSTEventEmitter';

import type { TurboModule } from 'react-native';
import {
  TurboModuleRegistry,
  DeviceEventEmitter,
  NativeModules,
} from 'react-native';

export interface NativeKSTEventEmitterSpec extends TurboModule {
  addListener(eventName: string): void;
  removeListeners(count: number): void;
  emit(eventName: string, ...args: any[]): void;
}

// Create a wrapper that provides the expected EventEmitter API
class KSTEventEmitterWrapper {
  private getModule() {
    // Try TurboModuleRegistry first (for New Architecture), fallback to NativeModules
    try {
      return TurboModuleRegistry.getEnforcing<NativeKSTEventEmitterSpec>(
        'KSTEventEmitter'
      );
    } catch {
      return NativeModules.KSTEventEmitter;
    }
  }

  addListener(eventName: string, handler: (...args: any[]) => void) {
    // Use DeviceEventEmitter as the underlying implementation
    return DeviceEventEmitter.addListener(eventName, handler);
  }

  emit(eventName: string, ...args: any[]) {
    const module = this.getModule();
    if (module && typeof module.emit === 'function') {
      module.emit(eventName, args);
    }
  }
}

export default new KSTEventEmitterWrapper();

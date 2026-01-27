# KST React Native Bridge - Turbo Modules with Backward Compatibility

A demonstration of React Native's New Architecture ecosystem with TurboModules, Fabric components, EventEmitter, and backward compatibility.

## Core Components

### 🚀 **TurboModule**

High-performance native module system with JSI integration for minimal bridge overhead.

### 🎨 **Fabric Component**

Next-generation UI component with prop-based styling and automatic layout management.

### 📡 **EventEmitter**

Cross-platform event communication system for real-time native-JavaScript data flow.

### 🔄 **Backward Compatible**

Intelligent architecture detection with automatic fallback to legacy systems.

## Installation

```sh
npm install react-native-kst-bridge
# or
yarn add react-native-kst-bridge
```

### iOS

```sh
cd ios && pod install
```

### React Native Version Compatibility

- **React Native 0.74 and below**: Supports both Old Architecture and New Architecture (TurboModules)
- **React Native 0.82+**: New Architecture only (Old Architecture deprecated by React Native core team)

For React Native 0.83+, the library will automatically use New Architecture as it's now the default.

## Usage

```js
import {
  multiply,
  reverseString,
  getNumbers,
  getOBject,
  promiseNumber,
  callMeLater,
  KSTFabricView,
  KSTEventEmitter,
} from 'react-native-kst-bridge';
```

### Synchronous Methods

```js
// Multiply two numbers (returns promise)
const result = await multiply(3, 7); // 21

// Reverse a string (synchronous)
const reversed = reverseString('hello'); // 'olleh'

// Get array of numbers (synchronous)
const numbers = getNumbers(); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// Get object (synchronous)
const obj = getOBject(); // { result: 'success' }
```

### Asynchronous Methods

```js
// Promise-based method with delay
const value = await promiseNumber(42); // Returns 42 after 2 seconds

// Callback-based method
callMeLater(
  () => console.log('Success callback'),
  () => console.log('Failure callback')
);
// Randomly calls success or failure after 2 seconds
```

### Fabric Component

```js
// Use the Fabric component with custom styling
<KSTFabricView
  style={styles.fabricView}
  message="Hello from Fabric!"
  backgroundColor="#E3F2FD"
/>
```

#### Props

- **`message?: string`** - Text to display in the component
- **`backgroundColor?: ColorValue`** - Background color of the component
- **`style?: ViewStyle`** - React Native style object

#### Features

- **New Architecture Support** - Uses Fabric rendering system when available
- **Backward Compatible** - Falls back to Paper renderer in Old Architecture
- **Custom Styling** - Supports background color and text customization
- **TypeScript Support** - Full type safety with prop interfaces

### EventEmitter

```js
// Listen for events
const subscription = KSTEventEmitter.addListener('counterUpdate', (count) => {
  console.log('Counter updated:', count);
});

// Emit events
KSTEventEmitter.emit('counterUpdate', 42);
KSTEventEmitter.emit('userAction', 'button_clicked');
KSTEventEmitter.emit('dataUpdate', { timestamp: Date.now() });

// Clean up listeners
subscription.remove();
```

#### Methods

- **`addListener(eventName: string, callback: Function)`** - Register event listener
- **`emit(eventName: string, ...args: any[])`** - Emit event with data
- **`removeListeners(count: number)`** - Remove multiple listeners

#### Supported Events

- **`counterUpdate`** - Counter value updates
- **`userAction`** - User interaction events
- **`dataUpdate`** - Data change events

#### Features

- **Cross-Platform** - Works on both iOS and Android
- **Architecture Agnostic** - Functions on both Old and New Architecture
- **Type Safety** - TypeScript support for event data
- **Memory Management** - Proper cleanup and listener management

## API Reference

### `multiply(a: number, b: number): Promise<number>`

Multiplies two numbers and returns the result as a promise.

### `reverseString(str: string): string`

Reverses a string synchronously.

### `getNumbers(): Array<number>`

Returns an array of numbers from 0 to 9.

### `getOBject(): { [key: string]: string }`

Returns a sample object.

### `promiseNumber(value: number): Promise<number>`

Returns the input value after a 2-second delay.

### `callMeLater(successCB: () => void, failureCB: () => void): void`

Randomly calls either the success or failure callback after 2 seconds.

## Architecture

This library demonstrates TurboModule, Fabric Component, and EventEmitter implementation with backward compatibility:

### New Architecture (TurboModules + Fabric)

- Uses `NativeKstBridgeSpec` and `KSTEventEmitterSpec` generated from TypeScript specs
- Implementation in `android/src/newarch/java/com/kstbridge/` and `ios/`
- Enabled when `newArchEnabled=true` in `gradle.properties`
- Fabric rendering system for UI components

### Old Architecture

- Uses `ReactContextBaseJavaModule` for Android
- Implementation in `android/src/oldarch/java/com/kstbridge/`
- Falls back automatically when New Architecture is disabled
- Paper rendering system for UI components

### Shared Implementation

- Business logic in `KstBridgeModuleImpl` (Android) and implementation methods (iOS)
- Both architectures delegate to the same core implementation
- `TurboReactPackage` dynamically sets `isTurboModule` flag based on `BuildConfig.IS_NEW_ARCHITECTURE_ENABLED`

### Component Types

- **TurboModules**: `multiply()`, `promiseNumber()`, `reverseString()`, etc. - Native module methods
- **Fabric Component**: `KSTFabricView` - Modern UI component with props
- **EventEmitter**: `KSTEventEmitter` - Cross-platform event system

### Architecture Detection

The library automatically detects and uses the appropriate architecture:

```js
const IS_NEW_ARCH = (global as any).nativeFabricUIManager != null;
```

### File Structure

```
src/
├── NativeKstBridge.ts           # TurboModule spec
├── KSTEventEmitter.ts          # EventEmitter spec
├── KSTFabricViewNativeComponent.ts  # Fabric component spec
└── index.tsx                   # Main exports

android/
├── src/main/java/              # New Architecture
├── src/oldarch/java/           # Old Architecture
└── build.gradle                # Codegen configuration

ios/
├── KSTNativeModule.h/.mm       # TurboModule implementation
├── KSTEventEmitter.h/.mm       # EventEmitter implementation
└── KSTFabricViewManager.mm     # Fabric component manager
```

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

# KST React Native Bridge - Turbo Modules with Backward Compatibility

Showcase for React Native Turbo Modules with full support for both Old and New Architecture.

## Features

- **TurboModule Support** - Full New Architecture implementation
- **Backward Compatible** - Seamlessly works with Old Architecture
- **Multiple Method Types** - Promises, callbacks, and synchronous methods
- **Cross-Platform** - iOS and Android native implementations
- **Architecture Detection** - Automatically adapts based on `newArchEnabled` flag

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

This library demonstrates TurboModule implementation with backward compatibility:

### New Architecture (TurboModules)

- Uses `NativeKstBridgeSpec` generated from TypeScript spec
- Implementation in `android/src/newarch/java/com/kstbridge/KstBridgeModule.kt` and `ios/KstBridge.mm`
- Enabled when `newArchEnabled=true` in `gradle.properties`

### Old Architecture

- Uses `ReactContextBaseJavaModule` for Android
- Implementation in `android/src/oldarch/java/com/kstbridge/KstBridgeModule.kt`
- Falls back automatically when New Architecture is disabled

### Shared Implementation

- Business logic in `KstBridgeModuleImpl` (Android) and implementation methods (iOS)
- Both architectures delegate to the same core implementation
- `TurboReactPackage` dynamically sets `isTurboModule` flag based on `BuildConfig.IS_NEW_ARCHITECTURE_ENABLED`

### Method Types

- **Promises**: `multiply()`, `promiseNumber()` - Async operations
- **Callbacks**: `callMeLater()` - Success/failure callbacks
- **Synchronous**: `reverseString()`, `getNumbers()`, `getOBject()` - Immediate return values

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

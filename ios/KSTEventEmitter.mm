#import "KSTEventEmitter.h"
#import <React/RCTConvert.h>

/*
    React Native Export Macros:

    RCT_EXPORT_MODULE(): Registers native module. Optional custom name.

    RCT_EXPORT_METHOD: Async methods (promises/callbacks). Old/New Architecture
   compatible.

    RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD: Sync methods returning typed values.
   Keep fast.

    RCT_REMAP_METHOD: Different JS name than Objective-C method.

    RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD: Deprecated. Blocks JS thread.

    EventEmitter Specific:
    - supportedEvents: Array of event names this emitter can send
    - sendEventWithName:body: Core method to emit events to JavaScript
    - addListener/removeListeners: Required interface methods for event handling
*/

@implementation KSTEventEmitter

// Register this class as "KSTEventEmitter" module with React Native
RCT_EXPORT_MODULE(KSTEventEmitter)

// Define the events this emitter can send to JavaScript
- (NSArray<NSString *> *)supportedEvents {
  return @[ @"counterUpdate", @"userAction", @"dataUpdate" ];
}

// Required method for EventEmitter interface - handles listener registration
RCT_EXPORT_METHOD(addListener : (NSString *)eventName) {
  // Required for event emitter interface
}

// Required method for EventEmitter interface - handles listener cleanup
RCT_EXPORT_METHOD(removeListeners : (double)count) {
  // Required for event emitter interface
}

// Exported method to emit events with data to JavaScript listeners
RCT_EXPORT_METHOD(emit : (NSString *)eventName args : (NSArray *)args) {
  [self sendEventWithName:eventName body:args];
}

// Internal method that actually sends the event through the React Native bridge
- (void)sendEvent:(NSString *)eventName body:(id)body {
  if (self.bridge) {
    [self sendEventWithName:eventName body:body];
  }
}

@end

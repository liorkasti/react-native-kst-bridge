#import "KSTNativeModule.h"

/*
    React Native Export Macros:

    RCT_EXPORT_MODULE(): Registers native module. Optional custom name.

    RCT_EXPORT_METHOD: Async methods (promises/callbacks). Old/New Architecture
   compatible.

    RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD: Sync methods returning typed values.
   Keep fast.

    RCT_REMAP_METHOD: Different JS name than Objective-C method.

    RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD: Deprecated. Blocks JS thread.
*/

@implementation KstBridge
RCT_EXPORT_MODULE()

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeKstBridgeSpecJSI>(params);
}
#endif

// Promise-based methods work with both Old and New Architecture
RCT_EXPORT_METHOD(multiply : (double)a b : (double)b resolve : (
    RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  NSNumber *result = @(a * b);
  resolve(result);
}

RCT_EXPORT_METHOD(callMeLater : (RCTResponseSenderBlock)
                      successCB failureCB : (RCTResponseSenderBlock)failureCB) {
  BOOL random = arc4random_uniform(2) == 0;

  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)),
                 dispatch_get_main_queue(), ^{
                   if (random) {
                     successCB(@[]);
                   } else {
                     failureCB(@[]);
                   }
                 });
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSArray<NSNumber *> *, getNumbers) {
  NSMutableArray<NSNumber *> *numbersArray = [NSMutableArray array];
  for (int i = 0; i < 10; ++i) {
    [numbersArray addObject:@(i)];
  }

  return numbersArray;
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSDictionary *, getOBject) {
  NSMutableDictionary *object = [NSMutableDictionary dictionary];
  [object setObject:@"success" forKey:@"result"];

  return object;
}

RCT_EXPORT_METHOD(promiseNumber : (double)value resolve : (
    RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)),
                 dispatch_get_main_queue(), ^{
                   resolve(@(value));
                 });
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSString *,
                                    reverseString : (NSString *)str) {
  NSUInteger length = [str length];
  NSMutableString *reversedString = [NSMutableString stringWithCapacity:length];

  for (NSInteger i = length - 1; i >= 0; --i) {
    [reversedString appendFormat:@"%C", [str characterAtIndex:i]];
  }

  return reversedString;
}

@end

#import "KSTNativeModule.h"

/*
    React Native Export Macros:

    RCT_EXPORT_MODULE():
    - Registers the native module with React Native
    - Optional: Pass custom name as parameter, e.g., RCT_EXPORT_MODULE(CustomName)

    RCT_EXPORT_METHOD:
    - Used for asynchronous methods (promises, callbacks)
    - Automatically generates protocol conformance for New Architecture (TurboModules)
    - Works seamlessly with both Old and New Architecture
    - Methods return void and use resolve/reject blocks or callbacks

    RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD:
    - Used for synchronous methods that return immediate values
    - Returns typed values directly (NSString*, NSNumber*, NSArray*, etc.)
    - Executes on the JavaScript thread, so keep operations fast
    - Should not perform heavy computations or blocking operations

    RCT_REMAP_METHOD:
    - Exports a method with a different name to JavaScript
    - Useful when Objective-C method name differs from desired JS name

    RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD:
    - Deprecated in favor of RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD
    - Blocks the JavaScript thread until completion
*/

@implementation KstBridge
RCT_EXPORT_MODULE()

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeKstBridgeSpecJSI>(params);
}
#endif

// Promise-based methods work with both Old and New Architecture
RCT_EXPORT_METHOD(multiply:(double)a
                  b:(double)b
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    NSNumber *result = @(a * b);
    resolve(result);
}

RCT_EXPORT_METHOD(callMeLater:(RCTResponseSenderBlock)successCB failureCB:(RCTResponseSenderBlock)failureCB) {
    BOOL random = arc4random_uniform(2) == 0;

    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        if(random){
            successCB(@[]);
        } else {
            failureCB(@[]);
        }
    });
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSArray<NSNumber *> *, getNumbers) {
    NSMutableArray<NSNumber *> * numbersArray = [NSMutableArray array];
    for (int i = 0; i < 10; ++i) {
        [numbersArray addObject:@(i)];
    }

    return numbersArray;
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSDictionary *,getOBject) {
    NSMutableDictionary * object = [NSMutableDictionary dictionary];
    [object setObject:@"success" forKey:@"result"];

    return object;
}

RCT_EXPORT_METHOD(promiseNumber:(double)value resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        resolve(@(value));
    });
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSString *, reverseString:(NSString *)str) {
    NSUInteger length = [str length];
    NSMutableString * reversedString = [NSMutableString stringWithCapacity:length];

    for (NSInteger i = length -1; i >= 0; --i) {
        [reversedString appendFormat:@"%C", [str characterAtIndex:i]];
    }

    return reversedString;
}


@end

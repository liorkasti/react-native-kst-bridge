#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface KSTEventEmitter : RCTEventEmitter <RCTBridgeModule>

- (void)sendEvent:(NSString *)eventName body:(id)body;

@end

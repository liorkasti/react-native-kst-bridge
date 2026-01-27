#ifdef RCT_NEW_ARCH_ENABLED
#import <KstBridgeSpec/KstBridgeSpec.h>
@interface KstBridge : NSObject <NativeKstBridgeSpec>
#else
#import <React/RCTBridgeModule.h>
@interface KstBridge : NSObject <RCTBridgeModule>
#endif

@end

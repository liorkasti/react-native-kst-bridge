#ifdef RCT_NEW_ARCH_ENABLED
#import <KstRnBackwardArchComptSpec/KstRnBackwardArchComptSpec.h>

@interface KstRnBackwardArchCompt : NSObject <NativeKstRnBackwardArchComptSpec>

@end
#else
#import <React/RCTBridgeModule.h>

@interface KstRnBackwardArchCompt : NSObject <RCTBridgeModule>

@end
#endif

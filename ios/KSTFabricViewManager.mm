#import "KSTFabricViewManager.h"
#import "KSTFabricView.h"

#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

/*
    React Native Export Macros:

    RCT_EXPORT_MODULE(): Registers native module. Optional custom name.

    RCT_EXPORT_METHOD: Async methods (promises/callbacks). Old/New Architecture
   compatible.

    RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD: Sync methods returning typed values.
   Keep fast.

    RCT_REMAP_METHOD: Different JS name than Objective-C method.

    RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD: Deprecated. Blocks JS thread.

    ViewManager Specific:
    - RCT_EXPORT_VIEW_PROPERTY: Exposes view properties to JavaScript
    - view: Returns the native view instance for this ViewManager
    - requiresMainQueueSetup: Indicates if UI setup must happen on main thread
*/

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTConversions.h>
#import <React/RCTFabricComponentsPlugins.h>
#import <React/RCTViewComponentView.h>
#import <react/renderer/components/KstBridgeSpec/ComponentDescriptors.h>
#import <react/renderer/components/KstBridgeSpec/Props.h>
#import <react/renderer/components/KstBridgeSpec/RCTComponentViewHelpers.h>

using namespace facebook::react;
#endif

@implementation KSTFabricViewManager

// Register this class as "KSTFabricView" ViewManager with React Native
RCT_EXPORT_MODULE(KSTFabricView)

// Return the native view instance for this ViewManager
- (UIView *)view {
  return [[KSTFabricView alloc] init];
}

// Export view properties to JavaScript - allows setting message from JS
RCT_EXPORT_VIEW_PROPERTY(message, NSString)

// Export view properties to JavaScript - allows setting backgroundColor from JS
RCT_EXPORT_VIEW_PROPERTY(backgroundColor, UIColor)

#ifdef RCT_NEW_ARCH_ENABLED
// Indicate that this ViewManager requires main queue setup for UI operations
+ (BOOL)requiresMainQueueSetup {
  return YES;
}
#endif

@end

#ifdef RCT_NEW_ARCH_ENABLED
// New Architecture Fabric Component View implementation
@interface KSTFabricViewComponentView : RCTViewComponentView
@end

@implementation KSTFabricViewComponentView {
  KSTFabricView *_view;
}

// Provide component descriptor for New Architecture rendering system
+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<
      KSTFabricViewComponentDescriptor>();
}

// Initialize the Fabric component view with default props and native view
- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps =
        std::make_shared<const KSTFabricViewProps>();
    _props = defaultProps;

    _view = [[KSTFabricView alloc] initWithFrame:self.bounds];
    _view.autoresizingMask =
        UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;

    self.contentView = _view;
  }
  return self;
}

// Update props when JavaScript component properties change
- (void)updateProps:(Props::Shared const &)props
           oldProps:(Props::Shared const &)oldProps {
  const auto &oldViewProps =
      *std::static_pointer_cast<const KSTFabricViewProps>(_props);
  const auto &newViewProps =
      *std::static_pointer_cast<const KSTFabricViewProps>(props);

  if (oldViewProps.message != newViewProps.message) {
    _view.message =
        [NSString stringWithUTF8String:newViewProps.message.c_str()];
  }

  if (oldViewProps.backgroundColor != newViewProps.backgroundColor) {
    _view.backgroundColor =
        RCTUIColorFromSharedColor(newViewProps.backgroundColor);
  }

  [super updateProps:props oldProps:oldProps];
}

@end

// Return the Fabric component view class for New Architecture
Class<RCTComponentViewProtocol> KSTFabricViewCls(void) {
  return KSTFabricViewComponentView.class;
}
#endif

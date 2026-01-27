#import "KSTFabricViewManager.h"
#import "KSTFabricView.h"

#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

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

RCT_EXPORT_MODULE(KSTFabricView)

- (UIView *)view {
  return [[KSTFabricView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(message, NSString)
RCT_EXPORT_VIEW_PROPERTY(backgroundColor, UIColor)

#ifdef RCT_NEW_ARCH_ENABLED
+ (BOOL)requiresMainQueueSetup {
  return YES;
}
#endif

@end

#ifdef RCT_NEW_ARCH_ENABLED
@interface KSTFabricViewComponentView : RCTViewComponentView
@end

@implementation KSTFabricViewComponentView {
  KSTFabricView *_view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<
      KSTFabricViewComponentDescriptor>();
}

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

Class<RCTComponentViewProtocol> KSTFabricViewCls(void) {
  return KSTFabricViewComponentView.class;
}
#endif

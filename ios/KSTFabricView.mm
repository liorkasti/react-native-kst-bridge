#import "KSTFabricView.h"

/*
    React Native Export Macros:

    RCT_EXPORT_MODULE(): Registers native module. Optional custom name.

    RCT_EXPORT_METHOD: Async methods (promises/callbacks). Old/New Architecture
   compatible.

    RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD: Sync methods returning typed values.
   Keep fast.

    RCT_REMAP_METHOD: Different JS name than Objective-C method.

    RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD: Deprecated. Blocks JS thread.

    Fabric View Specific:
    - This file contains the actual native UIView implementation
    - Properties are exposed through RCT_EXPORT_VIEW_PROPERTY in ViewManager
    - No export macros needed here - just native view implementation
*/

@implementation KSTFabricView {
  UILabel *_label;
}

// Initialize the Fabric view with default styling and layout
- (instancetype)initWithFrame:(CGRect)frame {
  self = [super initWithFrame:frame];
  if (self) {
    // Set default background color
    self.backgroundColor = [UIColor colorWithRed:0.88
                                           green:0.88
                                            blue:0.88
                                           alpha:1.0];

    // Configure the label for displaying text
    _label = [[UILabel alloc] init];
    _label.textAlignment = NSTextAlignmentLeft;
    _label.textColor = [UIColor blackColor];
    _label.font = [UIFont systemFontOfSize:12];
    _label.numberOfLines = 1;
    _label.adjustsFontSizeToFitWidth = YES;
    _label.minimumScaleFactor = 0.7;
    _label.translatesAutoresizingMaskIntoConstraints = NO;

    // Add label to view hierarchy
    [self addSubview:_label];

    // Setup Auto Layout constraints for label positioning
    [NSLayoutConstraint activateConstraints:@[
      [_label.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
      [_label.leadingAnchor constraintEqualToAnchor:self.leadingAnchor
                                           constant:12],
      [_label.trailingAnchor constraintEqualToAnchor:self.trailingAnchor
                                            constant:-12]
    ]];
  }
  return self;
}

// Property setter - called when JavaScript changes the message prop
- (void)setMessage:(NSString *)message {
  _message = [message copy];
  _label.text = message;
}

@end

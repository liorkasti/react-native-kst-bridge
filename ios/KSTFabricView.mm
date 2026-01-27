#import "KSTFabricView.h"

@implementation KSTFabricView {
    UILabel *_label;
}

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        self.backgroundColor = [UIColor colorWithRed:0.88 green:0.88 blue:0.88 alpha:1.0];

        _label = [[UILabel alloc] init];
        _label.textAlignment = NSTextAlignmentLeft;
        _label.textColor = [UIColor blackColor];
        _label.font = [UIFont systemFontOfSize:12];
        _label.numberOfLines = 1;
        _label.adjustsFontSizeToFitWidth = YES;
        _label.minimumScaleFactor = 0.7;
        _label.translatesAutoresizingMaskIntoConstraints = NO;

        [self addSubview:_label];

        [NSLayoutConstraint activateConstraints:@[
            [_label.centerYAnchor constraintEqualToAnchor:self.centerYAnchor],
            [_label.leadingAnchor constraintEqualToAnchor:self.leadingAnchor constant:12],
            [_label.trailingAnchor constraintEqualToAnchor:self.trailingAnchor constant:-12]
        ]];
    }
    return self;
}

- (void)setMessage:(NSString *)message {
    _message = [message copy];
    _label.text = message;
}

@end

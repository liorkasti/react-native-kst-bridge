import React from 'react';
import type { ColorValue, ViewProps, StyleProp, ViewStyle } from 'react-native';
import { requireNativeComponent } from 'react-native';

// Check if Fabric is enabled
// @ts-expect-error - nativeFabricUIManager is not in types
const isFabricEnabled = global.nativeFabricUIManager != null;

export interface KSTFabricViewProps extends ViewProps {
  message?: string;
  backgroundColor?: ColorValue;
  style?: StyleProp<ViewStyle>;
}

// For New Architecture (Fabric), use the codegen component
// For Old Architecture, use requireNativeComponent
const NativeKSTFabricView = isFabricEnabled
  ? require('./KSTFabricViewNativeComponent').default
  : requireNativeComponent<KSTFabricViewProps>('KSTFabricView');

export const KSTFabricView: React.FC<KSTFabricViewProps> = (props) => {
  return <NativeKSTFabricView {...props} />;
};

export default KSTFabricView;

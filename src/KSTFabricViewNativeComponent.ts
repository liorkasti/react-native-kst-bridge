import type { HostComponent, ViewProps, ColorValue } from 'react-native';
import { codegenNativeComponent } from 'react-native';

export interface NativeProps extends ViewProps {
  message?: string;
  backgroundColor?: ColorValue;
}

export default codegenNativeComponent<NativeProps>(
  'KSTFabricView'
) as HostComponent<NativeProps>;

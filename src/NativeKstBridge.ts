import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  multiply(a: number, b: number): Promise<number>;

  reverseString: (str: string) => string;

  getNumbers: () => Array<number>;

  getOBject: () => { [key: string]: string };

  promiseNumber: (value: number) => Promise<number>;

  callMeLater: (successCB: () => void, failureCB: () => void) => void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('KstBridge');

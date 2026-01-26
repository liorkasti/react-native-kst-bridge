import { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Text, Platform } from 'react-native';
import {
  multiply,
  reverseString,
  promiseNumber,
  callMeLater,
  getNumbers,
  getOBject,
} from 'react-native-kst-bridge';

const RN_VERSION = require('react-native/package.json').version;
const IS_NEW_ARCH = (global as any).nativeFabricUIManager != null;

export default function App() {
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Result: {result ?? 'Loading...'}</Text>
        <Button
          title="reverse string"
          onPress={() => {
            console.log(reverseString('reverse string'));
          }}
        />
        <Button
          title="get number"
          onPress={() => {
            console.log(getNumbers());
          }}
        />
        <Button
          title="get object"
          onPress={() => {
            console.log(getOBject());
          }}
        />
        <Button
          title="promise"
          onPress={async () => {
            const value = await promiseNumber(5);

            console.log('promised value is: ', value);
          }}
        />
        <Button
          title="callbacks"
          onPress={() => {
            callMeLater(
              () => console.log('success'),
              () => console.log('failure')
            );
          }}
        />
      </View>
      <View style={styles.metadata}>
        <Text style={styles.metadataText}>
          React Native: {RN_VERSION} • {Platform.OS}
        </Text>
        <Text style={styles.metadataText}>
          Architecture:{' '}
          {IS_NEW_ARCH ? '✨ New Architecture' : '🔧 Old Architecture'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  metadata: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  metadataText: {
    fontSize: 12,
    color: '#666',
    marginVertical: 2,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

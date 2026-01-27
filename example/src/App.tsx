import { useCallback, useEffect, useState } from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import {
  callMeLater,
  getNumbers,
  getOBject,
  KSTFabricView,
  multiply,
  promiseNumber,
  reverseString,
} from 'react-native-kst-bridge';
import { Logger } from './components/Logger';

const RN_VERSION = require('react-native/package.json').version;
const IS_NEW_ARCH = (global as any).nativeFabricUIManager != null;

interface LogEntry {
  id: string;
  message: string;
  timestamp: Date;
}

export default function App() {
  const [result, setResult] = useState<number | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = useCallback((message: string) => {
    setLogs((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        message,
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>KSTFabricView Demo</Text>

        <KSTFabricView
          style={styles.fabricView}
          message="Hello from KSTFabricView!"
          backgroundColor="#E3F2FD"
        />

        <Text style={styles.sectionTitle}>Module Methods</Text>
        <Text>Result: {result ?? 'Loading...'}</Text>

        <Button
          title="reverse string"
          onPress={() => {
            const reversed = reverseString('reverse string');
            console.log(reversed);
            addLog(`Reversed: ${reversed}`);
          }}
        />
        <Button
          title="get number"
          onPress={() => {
            const numbers = getNumbers();
            console.log(numbers);
            addLog(`Numbers: ${JSON.stringify(numbers)}`);
          }}
        />
        <Button
          title="get object"
          onPress={() => {
            const obj = getOBject();
            console.log(obj);
            addLog(`Object: ${JSON.stringify(obj)}`);
          }}
        />
        <Button
          title="promise"
          onPress={async () => {
            addLog('Waiting for promise...');
            const value = await promiseNumber(5);
            console.log('promised value is: ', value);
            addLog(`Promised value: ${value}`);
          }}
        />
        <Button
          title="callbacks"
          onPress={() => {
            addLog('Calling with callbacks...');
            callMeLater(
              () => {
                console.log('success');
                addLog('Callback: success');
              },
              () => {
                console.log('failure');
                addLog('Callback: failure');
              }
            );
          }}
        />
        <Text style={styles.sectionTitle}>Logger Component</Text>
        <Logger logs={logs} maxHeight={300} onClear={() => setLogs([])} />
      </View>
      <View style={styles.metadata}>
        <Text style={styles.metadataText}>
          React Native: {RN_VERSION} - {Platform.OS}
        </Text>
        <Text style={styles.metadataText}>
          Architecture: {IS_NEW_ARCH ? 'New Architecture' : 'Old Architecture'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 24,
    paddingTop: 60,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  fabricView: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    marginBottom: 16,
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
});

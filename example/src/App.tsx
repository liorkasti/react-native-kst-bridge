import { useCallback, useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  callMeLater,
  getNumbers,
  getOBject,
  KSTEventEmitter,
  KSTFabricView,
  multiply,
  promiseNumber,
  reverseString,
} from 'react-native-kst-bridge';
import { Logger } from './components/Logger';

import { version as RN_VERSION } from 'react-native/package.json';
const IS_NEW_ARCH = (global as any).nativeFabricUIManager != null;

interface LogEntry {
  id: string;
  message: string;
  timestamp: Date;
}

export default function App() {
  const [result, setResult] = useState<number | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [eventCount, setEventCount] = useState(0);

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

  useEffect(() => {
    // Listen for counter events
    const counterSubscription = KSTEventEmitter.addListener(
      'counterUpdate',
      (count) => {
        addLog(`Event: Counter updated to ${count}`);
        setEventCount((prev) => prev + 1);
      }
    );

    // Listen for user action events
    const actionSubscription = KSTEventEmitter.addListener(
      'userAction',
      (action) => {
        addLog(`Event: User action - ${action}`);
      }
    );

    // Listen for data update events
    const dataSubscription = KSTEventEmitter.addListener(
      'dataUpdate',
      (data) => {
        addLog(`Event: Data updated - ${JSON.stringify(data)}`);
      }
    );

    return () => {
      counterSubscription.remove();
      actionSubscription.remove();
      dataSubscription.remove();
    };
  }, [addLog]);

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

        <View style={styles.buttonGrid}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.customButton}
              onPress={() => {
                const reversed = reverseString('reverse string');
                console.log(reversed);
                addLog(`Reversed: ${reversed}`);
              }}
            >
              <Text style={styles.buttonText}>reverse string</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.customButton}
              onPress={() => {
                const numbers = getNumbers();
                console.log(numbers);
                addLog(`Numbers: ${JSON.stringify(numbers)}`);
              }}
            >
              <Text style={styles.buttonText}>get number</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.customButton}
              onPress={() => {
                const obj = getOBject();
                console.log(obj);
                addLog(`Object: ${JSON.stringify(obj)}`);
              }}
            >
              <Text style={styles.buttonText}>get object</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.customButton}
              onPress={async () => {
                addLog('Waiting for promise...');
                const value = await promiseNumber(5);
                console.log('promised value is: ', value);
                addLog(`Promised value: ${value}`);
              }}
            >
              <Text style={styles.buttonText}>promise</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.customButton}
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
            >
              <Text style={styles.buttonText}>callbacks</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>EventEmitter Tests</Text>
        <Text>Events Received: {eventCount}</Text>

        <View style={styles.buttonGrid}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.customButton}
              onPress={() => {
                const count = Math.floor(Math.random() * 100);
                KSTEventEmitter.emit('counterUpdate', count);
                addLog(`Emitted counter event: ${count}`);
              }}
            >
              <Text style={styles.buttonText}>Emit Counter Event</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.customButton}
              onPress={() => {
                KSTEventEmitter.emit('userAction', 'button_clicked');
                addLog('Emitted user action: button_clicked');
              }}
            >
              <Text style={styles.buttonText}>Emit User Action</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.customButton}
              onPress={() => {
                const data = { timestamp: Date.now(), type: 'test' };
                KSTEventEmitter.emit('dataUpdate', data);
                addLog(`Emitted data update: ${JSON.stringify(data)}`);
              }}
            >
              <Text style={styles.buttonText}>Emit Data Update</Text>
            </TouchableOpacity>
          </View>
        </View>

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
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
  },
  fabricView: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 4,
  },
  buttonContainer: {
    width: '48%',
    marginBottom: 6,
  },
  customButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
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

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { KSTFabricView } from 'react-native-kst-bridge';

interface LogEntry {
  id: string;
  message: string;
  timestamp: Date;
}

interface LoggerProps {
  logs?: LogEntry[];
  maxHeight?: number;
  onClear?: () => void;
}

export const Logger: React.FC<LoggerProps> = ({
  logs = [],
  maxHeight = 200,
  onClear,
}) => {
  return (
    <View style={[styles.container, { maxHeight }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Logger</Text>
        {onClear && logs.length > 0 && (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={true}
      >
        {logs.length === 0 ? (
          <KSTFabricView
            style={styles.logItem}
            message="No logs yet..."
            backgroundColor="#f0f0f0"
          />
        ) : (
          logs.map((log) => (
            <KSTFabricView
              key={log.id}
              style={styles.logItem}
              message={`[${log.timestamp.toLocaleTimeString()}] ${log.message}`}
              backgroundColor="#e8f5e9"
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 12,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#ff5252',
    borderRadius: 4,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  logItem: {
    height: 40,
    marginVertical: 4,
    borderRadius: 4,
  },
});

export default Logger;

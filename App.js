import {Text, View, StyleSheet, Platform, AysncStorage} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Focus} from './src/features/focus/focus';
import {colors} from './src/utilities/colors';
import {spacing} from './src/utilities/sizes';
import {Timer} from './src/features/timer/timer';
import {FocusHistory} from './src/features/focus/FocusHistory';

const status = {complete: 1, failure: 2};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [history, setHistory] = useState([]);

  const addFocusHistoryWithStatus = (subject, status) => {
    setHistory([
      ...history,
      {key: String(history.length + 1), subject, status},
    ]);
  };

  const onClear = () => {
    setHistory([]);
  };

  //  Saving to the storage
  const saveHistory = async () => {
    try {
      AysncStorage.setItem('History', JSON.stringify(history));
    } catch (e) {
      console.log(e);
    }
  };

  //  Loading from the storage

  const loadHistory = async () => {
    try {
      const history = await AysncStorage.getItem('History');

      if (history && JSON.parse(history).length) {
        setHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [history]);

  useEffect(() => {
    saveHistory();
  }, [history]);

  useEffect(() => {
    if (focusSubject) {
      setHistory([...history, focusSubject]);
    }
  }, [focusSubject]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Text style={styles.paragraph}>
          <Timer
            focusObject={focusSubject}
            onTimerEnd={() => {
              addFocusHistoryWithStatus(focusSubject, status.complete);
              setFocusSubject(null);
            }}
            clearSubject={() => {
              addFocusHistoryWithStatus(focusSubject, status.failure);
              setFocusSubject(null);
            }}
          />
        </Text>
      ) : (
        <>
          <View style={{flex: 1}}>
            <Focus addObject={setFocusSubject} />
            <FocusHistory history={history} onClear={onClear} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    padding: Platform.OS === 'ios' ? spacing.md : spacing.lg,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

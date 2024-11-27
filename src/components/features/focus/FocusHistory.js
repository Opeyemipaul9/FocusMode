import React from 'react';
import {View, StyleSheet, FlatList, Text, SafeAreaView} from 'react-native';
import {fontSizes, spacing} from '../../utilities/sizes';
import {RoundedButton} from '../../components/RoundedButton';

const items = ({item, index}) => {
  return <Text style={styles.items(item.status)}> {item.subject}</Text>;
};

export const FocusHistory = ({history, onClear}) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{flex: 0.5, alignItems: 'center'}}>
        {!!history.length && (
          <>
            <Text style={styles.title}> Things weve focused on </Text>

            <FlatList
              style={{flex: 1}}
              contentContainerStyle={{flex: 1, alignItems: 'center'}}
              data={history}
              renderItem={items}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  items: status => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: fontSizes.md,
  }),
  title: {
    color: 'white',
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
});

import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {RoundedButton} from '../../components/RoundedButton';
import {fontSizes, spacing} from '../../utilities/sizes';
import {colors} from '../../utilities/colors';

export const Focus = ({addObject}) => {
  const [inputText, setInputText] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titlecontainer}>
        <Text style={styles.title}> What would you like to focus on ?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{flex: 1, marginRight: spacing.md}}
            onSubmitEditing={event => {
              setInputText(event.nativeEvent.text);
            }}
          />
          <RoundedButton
            size={50}
            title="+"
            onPress={() => {
              addObject(inputText);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  titlecontainer: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

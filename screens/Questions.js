import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, ButtonGroup } from '@rneui/themed';

export default function Question({ route, navigation }) {
  const { data, index, userAnswers } = route.params;
  const current = data[index];

  const [selection, setSelection] = useState(
    current.type === 'multiple-answer' ? [] : null
  );

  const handlePress = (idx) => {
    if (current.type === 'multiple-answer') {
      if (selection.includes(idx)) {
        setSelection(selection.filter(item => item !== idx));
      } else {
        setSelection([...selection, idx]);
      }
    } else {
      setSelection(idx);
    }
  };

  const goToNext = () => {
    const updatedAnswers = [...userAnswers, selection];
    if (index + 1 < data.length) {
      navigation.push('Question', { data, index: index + 1, userAnswers: updatedAnswers });
    } else {
      navigation.navigate('Summary', { data, userAnswers: updatedAnswers });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.win98Container}>
      <View style={styles.window}>
        <View style={styles.titleBar}>
          <Text style={styles.titleBarText}>Question {index + 1}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.promptText}>{current.prompt}</Text>
          
          <ButtonGroup
            testID="choices"
            buttons={current.choices}
            selectMultiple={current.type === 'multiple-answer'}
            selectedIndexes={current.type === 'multiple-answer' ? selection : []}
            selectedIndex={current.type !== 'multiple-answer' ? selection : null}
            onPress={handlePress}
            vertical
            containerStyle={styles.choiceContainer}
            selectedButtonStyle={styles.selectedChoice}
            textStyle={styles.choiceText}
          />

          <Button
            testID="next-question"
            title="NEXT >"
            onPress={goToNext}
            disabled={selection === null || (Array.isArray(selection) && selection.length === 0)}
            buttonStyle={styles.retroBtn}
            titleStyle={styles.retroBtnTitle}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  win98Container: { flexGrow: 1, backgroundColor: '#008080', padding: 15, justifyContent: 'center' },
  window: { backgroundColor: '#c0c0c0', borderWidth: 2, borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#000', borderBottomColor: '#000', padding: 4 },
  titleBar: { backgroundColor: '#000080', padding: 4, marginBottom: 15 },
  titleBarText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  content: { padding: 10 },
  promptText: { fontSize: 18, marginBottom: 20, fontFamily: 'monospace', fontWeight: 'bold' },
  choiceContainer: { backgroundColor: '#fff', borderWidth: 2, borderTopColor: '#000', borderLeftColor: '#000', borderRightColor: '#fff', borderBottomColor: '#fff' },
  selectedChoice: { backgroundColor: '#000080' },
  choiceText: { fontFamily: 'monospace' },
  retroBtn: { backgroundColor: '#c0c0c0', borderWidth: 2, borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#000', borderBottomColor: '#000', marginTop: 10 },
  retroBtnTitle: { color: '#000', fontFamily: 'monospace', fontWeight: 'bold' }
});
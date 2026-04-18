import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, ButtonGroup } from '@rneui/themed';

export default function Question({ route, navigation }) {
  const { data, index, userAnswers } = route.params;
  const current = data[index];

  const [selection, setSelection] = useState(
    current.type === 'multiple-answer' ? [] : null
  );

  // Reset selection when the index changes (for pushing new questions)
  useEffect(() => {
    setSelection(current.type === 'multiple-answer' ? [] : null);
  }, [index]);

  const handlePress = (idx) => {
    if (current.type === 'multiple-answer') {
      let newSelection = [...selection];
      if (newSelection.includes(idx)) {
        newSelection = newSelection.filter(item => item !== idx);
      } else {
        newSelection.push(idx);
      }
      setSelection(newSelection);
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
            // Crucial: use selectedIndexes for BOTH types to ensure highlights stay
            selectedIndexes={current.type === 'multiple-answer' ? selection : [selection]}
            onPress={handlePress}
            vertical
            containerStyle={styles.choiceContainer}
            selectedButtonStyle={styles.selectedChoice}
            selectedTextStyle={{ color: '#fff' }}
            textStyle={styles.choiceText}
          />

          <Button
            testID="next-question"
            title="NEXT >"
            onPress={goToNext}
            disabled={selection === null || (Array.isArray(selection) && selection.length === 0)}
            buttonStyle={styles.retroBtn}
            titleStyle={styles.retroBtnTitle}
            disabledStyle={{ opacity: 0.5 }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  win98Container: { flexGrow: 1, backgroundColor: '#FFB6C1', padding: 15, justifyContent: 'center', alignItems: 'center' },
  window: { width: '90%', backgroundColor: '#FFF0F5', borderWidth: 3, borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#D81B60', borderBottomColor: '#D81B60', padding: 4 },
  titleBar: { backgroundColor: '#D81B60', padding: 4, marginBottom: 15 },
  titleBarText: { color: 'white', fontWeight: 'bold', fontSize: 12, fontFamily: 'monospace' },
  content: { padding: 10 },
  promptText: { fontSize: 16, marginBottom: 20, fontFamily: 'monospace', fontWeight: 'bold', color: '#D81B60' },
  choiceContainer: { backgroundColor: '#fff', borderWidth: 2, borderTopColor: '#000', borderLeftColor: '#000', borderRightColor: '#fff', borderBottomColor: '#fff', marginLeft: 0, marginRight: 0 },
  selectedChoice: { backgroundColor: '#D81B60' },
  choiceText: { fontFamily: 'monospace', color: '#D81B60' },
  retroBtn: { backgroundColor: '#FFD1DC', borderWidth: 2, borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#D81B60', borderBottomColor: '#D81B60', marginTop: 10 },
  retroBtnTitle: { color: '#D81B60', fontFamily: 'monospace', fontWeight: 'bold' }
});
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, ButtonGroup } from '@rneui/themed';

export default function Questions({ route, navigation }) {
  const { data, index, userAnswers } = route.params;
  const current = data[index];

  // Always start with an empty array to keep ButtonGroup happy
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    setSelection([]);
  }, [index]);

  const handlePress = (idx) => {
    if (current.type === 'multiple-answer') {
      if (selection.includes(idx)) {
        setSelection(selection.filter(i => i !== idx));
      } else {
        setSelection([...selection, idx]);
      }
    } else {
      // For single choice, we just set the array to contain that one index
      setSelection([idx]);
    }
  };

  const goToNext = () => {
    // For single choice questions, we pass just the number; for multi, the array
    const answerToStore = current.type === 'multiple-answer' ? selection : selection[0];
    const updatedAnswers = [...userAnswers, answerToStore];
    
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
          <Text style={styles.titleBarText}>QUIZ.EXE - {index + 1}/{data.length}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.promptText}>{current.prompt}</Text>
          
          <ButtonGroup
            buttons={current.choices}
            selectMultiple={current.type === 'multiple-answer'}
            // Always passing an array here is the key to the highlight fix
            selectedIndexes={selection}
            onPress={handlePress}
            vertical
            containerStyle={styles.choiceContainer}
            selectedButtonStyle={styles.selectedChoice}
            selectedTextStyle={{ color: '#fff' }}
            textStyle={styles.choiceText}
          />

          <Button
            title="NEXT >"
            onPress={goToNext}
            disabled={selection.length === 0}
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
  win98Container: { flexGrow: 1, backgroundColor: '#FFB6C1', padding: 10, justifyContent: 'center', alignItems: 'center' },
  window: { width: '85%', backgroundColor: '#FFF0F5', borderWidth: 3, borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#D81B60', borderBottomColor: '#D81B60' },
  titleBar: { backgroundColor: '#D81B60', padding: 4 },
  titleBarText: { color: 'white', fontWeight: 'bold', fontSize: 11, fontFamily: 'monospace' },
  content: { padding: 15 },
  promptText: { fontSize: 15, marginBottom: 15, fontFamily: 'monospace', fontWeight: 'bold', color: '#D81B60' },
  choiceContainer: { backgroundColor: '#fff', borderWidth: 2, borderTopColor: '#000', borderLeftColor: '#000', borderRightColor: '#fff', borderBottomColor: '#fff', marginLeft: 0, marginRight: 0 },
  selectedChoice: { backgroundColor: '#D81B60' },
  choiceText: { fontFamily: 'monospace', color: '#D81B60', fontSize: 13 },
  retroBtn: { backgroundColor: '#FFD1DC', borderWidth: 2, borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#D81B60', borderBottomColor: '#D81B60', marginTop: 10 },
  retroBtnTitle: { color: '#D81B60', fontFamily: 'monospace', fontWeight: 'bold' }
});
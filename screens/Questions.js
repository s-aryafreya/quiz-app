import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text } from '@rneui/themed';

export default function Questions({ route, navigation }) {
  const { data, index, userAnswers } = route.params;
  const current = data[index];

  // Logic to track selections manually
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    setSelection([]);
  }, [index]);

  const handlePress = (idx) => {
    if (current.type === 'multiple-answer') {
      if (selection.includes(idx)) {
        setSelection(selection.filter(i => i !== idx));
      } else if (selection.length < 2) { // Limit to 2 selections
        setSelection([...selection, idx]);
      }
    } else {
      setSelection([idx]);
    }
  };

  const isSelectionCorrect = () => {
    if (current.type === 'multiple-answer') {
      return selection.length === 2 && 
             [...selection].sort().join(',') === [...current.correct].sort().join(',');
    }
    return selection[0] === current.correct;
  };

  const goToNext = () => {
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
          
          {/* Custom Button List for better control */}
          <View style={styles.choiceList}>
            {current.choices.map((choice, idx) => {
              const isSelected = selection.includes(idx);
              return (
                <TouchableOpacity 
                  key={idx} 
                  onPress={() => handlePress(idx)}
                  style={[styles.customBtn, isSelected && styles.customBtnSelected]}
                >
                  <Text style={[styles.choiceText, isSelected && styles.choiceTextSelected]}>
                    {isSelected ? '[X] ' : '[ ] '} {choice}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Button
            title={isSelectionCorrect() ? "NEXT ✓" : "NEXT >"}
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
  choiceList: { marginBottom: 15 },
  customBtn: { 
    backgroundColor: '#fff', 
    padding: 10, 
    marginVertical: 4, 
    borderWidth: 2, 
    borderTopColor: '#000', 
    borderLeftColor: '#000', 
    borderRightColor: '#fff', 
    borderBottomColor: '#fff' 
  },
  customBtnSelected: { 
    backgroundColor: '#D81B60', 
    borderTopColor: '#800040', 
    borderLeftColor: '#800040', 
    borderRightColor: '#FFD1DC', 
    borderBottomColor: '#FFD1DC' 
  },
  choiceText: { fontFamily: 'monospace', color: '#D81B60', fontSize: 13 },
  choiceTextSelected: { color: '#fff', fontWeight: 'bold' },
  retroBtn: { backgroundColor: '#FFD1DC', borderWidth: 2, borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#D81B60', borderBottomColor: '#D81B60', marginTop: 10 },
  retroBtnTitle: { color: '#D81B60', fontFamily: 'monospace', fontWeight: 'bold' }
});
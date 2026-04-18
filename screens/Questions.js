import React, { useState } from 'react';
// Combine all react-native imports into one line
// Removed 'FlatList' since it isn't used here
import { StyleSheet, View, ScrollView } from 'react-native'; 
// Use the Text and Button components specifically from RNEui for the themed look
import { Button, Text, ButtonGroup } from '@rneui/themed';

export default function Question({ route, navigation }) {
  const { data, index, userAnswers } = route.params;
  const current = data[index];

  // Initialize selection state based on question type
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
      // Use push for sequential navigation
      navigation.push('Question', { data, index: index + 1, userAnswers: updatedAnswers });
    } else {
      // Go to summary if it's the last question
      navigation.navigate('Summary', { data, userAnswers: updatedAnswers });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.win98Container}>
      <View style={styles.window}>
        {/* Retro Title Bar */}
        <View style={styles.titleBar}>
          <Text style={styles.titleBarText}>Question {index + 1}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.promptText}>{current.prompt}</Text>
          
          // Inside Question.js - Update your ButtonGroup component:
            <ButtonGroup
            testID="choices"
            buttons={current.choices}
            selectMultiple={current.type === 'multiple-answer'}
            // For multiple-answer, we pass the array. For others, we wrap the single index in an array
            selectedIndexes={current.type === 'multiple-answer' ? selection : [selection]}
            onPress={handlePress}
            vertical
            containerStyle={styles.choiceContainer}
            selectedButtonStyle={{ backgroundColor: '#D81B60' }} // Darker pink for selection
            selectedTextStyle={{ color: '#fff' }}
            textStyle={{ fontFamily: 'monospace', color: '#D81B60' }}
            />

          <Button
            testID="next-question"
            title="NEXT >"
            onPress={goToNext}
            // Button is disabled until an answer is picked
            disabled={selection === null || (Array.isArray(selection) && selection.length === 0)}
            buttonStyle={styles.retroBtn}
            titleStyle={styles.retroBtnTitle}
            disabledStyle={styles.disabledRetroBtn}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  win98Container: { 
    flexGrow: 1, 
    backgroundColor: '#008080', 
    padding: 15, 
    justifyContent: 'center' 
  },
  window: { 
    backgroundColor: '#c0c0c0', 
    borderWidth: 2, 
    borderTopColor: '#fff', 
    borderLeftColor: '#fff', 
    borderRightColor: '#000', 
    borderBottomColor: '#000', 
    padding: 4 
  },
  titleBar: { 
    backgroundColor: '#000080', 
    padding: 4, 
    marginBottom: 15 
  },
  titleBarText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 12, 
    fontFamily: 'monospace' 
  },
  content: { 
    padding: 10 
  },
  promptText: { 
    fontSize: 18, 
    marginBottom: 20, 
    fontFamily: 'monospace', 
    fontWeight: 'bold',
    color: '#000'
  },
  choiceContainer: { 
    backgroundColor: '#fff', 
    borderWidth: 2, 
    borderTopColor: '#000', 
    borderLeftColor: '#000', 
    borderRightColor: '#fff', 
    borderBottomColor: '#fff',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 20
  },
  selectedChoice: { 
    backgroundColor: '#000080' 
  },
  choiceText: { 
    fontFamily: 'monospace',
    color: '#000'
  },
  retroBtn: { 
    backgroundColor: '#c0c0c0', 
    borderWidth: 2, 
    borderTopColor: '#fff', 
    borderLeftColor: '#fff', 
    borderRightColor: '#000', 
    borderBottomColor: '#000'
  },
  disabledRetroBtn: {
    backgroundColor: '#d3d3d3',
    opacity: 0.5
  },
  retroBtnTitle: { 
    color: '#000', 
    fontFamily: 'monospace', 
    fontWeight: 'bold' 
  }
});
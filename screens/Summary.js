import React from 'react';
// Combine all react-native imports into one clean line
import { ScrollView, View, StyleSheet } from 'react-native';
// Use the themed components from RNEui
import { Text, Divider } from '@rneui/themed';

export default function Summary({ route }) {
  const { data, userAnswers } = route.params;

  const checkCorrect = (q, userAns) => {
    if (q.type === 'multiple-answer') {
      if (!Array.isArray(userAns)) return false;
      // Sort both arrays to ensure [0, 2] matches [2, 0]
      return [...userAns].sort().join(',') === [...q.correct].sort().join(',');
    }
    return userAns === q.correct;
  };

  const totalScore = data.reduce((score, q, i) => score + (checkCorrect(q, userAnswers[i]) ? 1 : 0), 0);

  return (
    <ScrollView style={styles.bg}>
      {/* Score Display Window */}
      <View style={styles.scoreBox}>
        <Text h2 testID="total" style={styles.scoreText}>
          TOTAL: {totalScore} / {data.length}
        </Text>
      </View>

      {data.map((q, qIdx) => {
        const userAns = userAnswers[qIdx];
        const isUserCorrect = checkCorrect(q, userAns);

        return (
          <View key={qIdx} style={styles.resultCard}>
            <Text style={styles.questionPrompt}>{qIdx + 1}. {q.prompt}</Text>
            <Divider style={{ marginVertical: 10 }} />
            
            {q.choices.map((choice, cIdx) => {
              // Determine if this specific choice was picked and if it's correct
              const wasSelected = Array.isArray(userAns) ? userAns.includes(cIdx) : userAns === cIdx;
              const isRight = Array.isArray(q.correct) ? q.correct.includes(cIdx) : q.correct === cIdx;

              let textStyle = {};
              // Logic: Bold if it's correct (whether chosen or not), Strike if chosen but wrong
              if (wasSelected && isRight) textStyle = styles.boldCorrect;
              if (wasSelected && !isRight) textStyle = styles.strikeIncorrect;
              if (!wasSelected && isRight) textStyle = styles.boldCorrect;

              return (
                <Text key={cIdx} style={[styles.choiceItem, textStyle]}>
                  [{isRight ? '✓' : ' '}] {choice}
                </Text>
              );
            })}
            
            <Text style={isUserCorrect ? styles.pass : styles.fail}>
              {isUserCorrect ? "[STATUS: PASS]" : "[STATUS: FAIL]"}
            </Text>
          </View>
        );
      })}
      
      {/* Space at the bottom for scrolling */}
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg: { 
    flex: 1, 
    backgroundColor: '#008080', 
    padding: 15 
  },
  scoreBox: { 
    backgroundColor: '#c0c0c0', 
    padding: 20, 
    marginBottom: 20, 
    borderWidth: 2, 
    borderBottomColor: '#000', 
    borderRightColor: '#000',
    borderTopColor: '#fff',
    borderLeftColor: '#fff'
  },
  scoreText: { 
    textAlign: 'center', 
    fontFamily: 'monospace', 
    color: '#000080',
    fontWeight: 'bold'
  },
  resultCard: { 
    backgroundColor: '#c0c0c0', 
    padding: 15, 
    marginBottom: 15, 
    borderWidth: 2, 
    borderTopColor: '#fff', 
    borderLeftColor: '#fff',
    borderRightColor: '#000',
    borderBottomColor: '#000'
  },
  questionPrompt: { 
    fontWeight: 'bold', 
    fontFamily: 'monospace',
    color: '#000'
  },
  choiceItem: { 
    fontFamily: 'monospace', 
    marginVertical: 2,
    color: '#333'
  },
  boldCorrect: { 
    fontWeight: 'bold', 
    color: '#000080' 
  },
  strikeIncorrect: { 
    textDecorationLine: 'line-through', 
    color: '#ff0000' 
  },
  pass: { 
    marginTop: 10, 
    color: 'green', 
    fontWeight: 'bold',
    fontFamily: 'monospace'
  },
  fail: { 
    marginTop: 10, 
    color: 'red', 
    fontWeight: 'bold',
    fontFamily: 'monospace'
  }
});
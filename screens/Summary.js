import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Divider, Button } from '@rneui/themed';

export default function Summary({ route, navigation }) {
  const { data, userAnswers } = route.params;

  const checkCorrect = (q, userAns) => {
    if (q.type === 'multiple-answer') {
      if (!Array.isArray(userAns)) return false;
      return [...userAns].sort().join(',') === [...q.correct].sort().join(',');
    }
    return userAns === q.correct;
  };

  const totalScore = data.reduce((score, q, i) => score + (checkCorrect(q, userAnswers[i]) ? 1 : 0), 0);

  return (
    <ScrollView style={styles.bg}>
      {/* Pink Score Display Window */}
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
            <Divider color="#FFB6C1" style={{ marginVertical: 10 }} />
            
            {q.choices.map((choice, cIdx) => {
              const wasSelected = Array.isArray(userAns) ? userAns.includes(cIdx) : userAns === cIdx;
              const isRight = Array.isArray(q.correct) ? q.correct.includes(cIdx) : q.correct === cIdx;

              let textStyle = {};
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
      
      {/* Restart Button to go back to Home */}
      <Button 
        title="< BACK TO START" 
        onPress={() => navigation.popToTop()} 
        buttonStyle={styles.restartBtn}
        titleStyle={styles.restartBtnTitle}
      />

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg: { 
    flex: 1, 
    backgroundColor: '#FFB6C1', // Light Pink Background
    padding: 15 
  },
  scoreBox: { 
    backgroundColor: '#FFF0F5', 
    padding: 20, 
    marginBottom: 20, 
    borderWidth: 3, 
    borderBottomColor: '#D81B60', 
    borderRightColor: '#D81B60',
    borderTopColor: '#fff',
    borderLeftColor: '#fff'
  },
  scoreText: { 
    textAlign: 'center', 
    fontFamily: 'monospace', 
    color: '#D81B60',
    fontWeight: 'bold'
  },
  resultCard: { 
    backgroundColor: '#FFF0F5', 
    padding: 15, 
    marginBottom: 15, 
    borderWidth: 3, 
    borderTopColor: '#fff', 
    borderLeftColor: '#fff',
    borderRightColor: '#D81B60',
    borderBottomColor: '#D81B60'
  },
  questionPrompt: { 
    fontWeight: 'bold', 
    fontFamily: 'monospace',
    color: '#D81B60'
  },
  choiceItem: { 
    fontFamily: 'monospace', 
    marginVertical: 2,
    color: '#333'
  },
  boldCorrect: { 
    fontWeight: 'bold', 
    color: '#D81B60' // Bold pink for correct
  },
  strikeIncorrect: { 
    textDecorationLine: 'line-through', 
    color: '#FF69B4' // Hot pink for incorrect
  },
  pass: { 
    marginTop: 10, 
    color: '#D81B60', 
    fontWeight: 'bold',
    fontFamily: 'monospace'
  },
  fail: { 
    marginTop: 10, 
    color: '#FF1493', 
    fontWeight: 'bold',
    fontFamily: 'monospace'
  },
  restartBtn: { 
    backgroundColor: '#FFD1DC', 
    borderWidth: 2, 
    borderTopColor: '#fff', 
    borderLeftColor: '#fff', 
    borderRightColor: '#D81B60', 
    borderBottomColor: '#D81B60',
    marginTop: 10 
  },
  restartBtnTitle: { 
    color: '#D81B60', 
    fontFamily: 'monospace', 
    fontWeight: 'bold' 
  }
});
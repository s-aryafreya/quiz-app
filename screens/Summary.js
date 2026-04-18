import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Divider, Button } from '@rneui/themed';

export default function Summary({ route, navigation }) {
  const { data, userAnswers } = route.params;

  const checkCorrect = (q, userAns) => {
    if (q.type === 'multiple-answer') {
      if (!Array.isArray(userAns)) return false;
      // Sort and stringify to compare [0, 2, 3] correctly
      const sortedUser = [...userAns].sort((a, b) => a - b).join(',');
      const sortedCorrect = [...q.correct].sort((a, b) => a - b).join(',');
      return sortedUser === sortedCorrect;
    }
    return userAns === q.correct;
  };

  const totalScore = data.reduce((score, q, i) => score + (checkCorrect(q, userAnswers[i]) ? 1 : 0), 0);

  return (
    <ScrollView contentContainerStyle={styles.bg}>
      <View style={styles.window}>
        <View style={styles.titleBar}><Text style={styles.titleText}>FINAL_SCORE.LOG</Text></View>
        
        <View style={styles.scoreBox}>
          <Text testID="total" style={styles.scoreText}>SCORE: {totalScore} / {data.length}</Text>
        </View>

        {data.map((q, qIdx) => {
          const userAns = userAnswers[qIdx];
          const isUserCorrect = checkCorrect(q, userAns);

          return (
            <View key={qIdx} style={styles.resultCard}>
              <Text style={styles.questionPrompt}>{qIdx + 1}. {q.prompt}</Text>
              <Divider color="#FFB6C1" style={{ marginVertical: 5 }} />
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
                {isUserCorrect ? "[PASS]" : "[FAIL]"}
              </Text>
            </View>
          );
        })}

        <Button 
          title="BACK TO START" 
          onPress={() => navigation.popToTop()} 
          buttonStyle={styles.restartBtn}
          titleStyle={styles.btnTitle}
        />
      </View>
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg: { flexGrow: 1, backgroundColor: '#FFB6C1', padding: 15, alignItems: 'center', justifyContent: 'center' },
  window: { width: '90%', backgroundColor: '#FFF0F5', borderWidth: 3, borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#D81B60', borderBottomColor: '#D81B60' },
  titleBar: { backgroundColor: '#D81B60', padding: 4 },
  titleText: { color: 'white', fontFamily: 'monospace', fontWeight: 'bold', fontSize: 11 },
  scoreBox: { backgroundColor: '#FFD1DC', padding: 10, margin: 10, borderWidth: 2, borderStyle: 'dashed', borderColor: '#D81B60' },
  scoreText: { textAlign: 'center', fontFamily: 'monospace', color: '#D81B60', fontWeight: 'bold', fontSize: 18 },
  resultCard: { paddingHorizontal: 15, paddingVertical: 10 },
  questionPrompt: { fontWeight: 'bold', fontFamily: 'monospace', color: '#D81B60', fontSize: 12 },
  choiceItem: { fontFamily: 'monospace', fontSize: 11, marginVertical: 1 },
  boldCorrect: { fontWeight: 'bold', color: '#D81B60' },
  strikeIncorrect: { textDecorationLine: 'line-through', color: '#FF69B4' },
  pass: { color: '#D81B60', fontWeight: 'bold', fontSize: 10 },
  fail: { color: '#FF1493', fontWeight: 'bold', fontSize: 10 },
  restartBtn: { backgroundColor: '#FFD1DC', borderWidth: 2, borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#D81B60', borderBottomColor: '#D81B60', margin: 15 },
  btnTitle: { color: '#D81B60', fontWeight: 'bold', fontFamily: 'monospace', fontSize: 12 }
});
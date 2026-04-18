import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from '@rneui/themed';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.window}>
        <View style={styles.titleBar}><Text style={styles.titleText}>LOGIN.EXE</Text></View>
        <View style={styles.innerContent}>
          <Text style={styles.header}>Ready for the Quiz?</Text>
          <Button 
            title="START QUIZ" 
            onPress={() => navigation.navigate('Question', { index: 0, userAnswers: [] })}
            buttonStyle={styles.btn}
            titleStyle={styles.btnTitle}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFB6C1', justifyContent: 'center', alignItems: 'center' },
  window: { 
    width: '80%', // Smaller than full width
    backgroundColor: '#FFF0F5', 
    borderWidth: 3, 
    borderTopColor: '#fff', 
    borderLeftColor: '#fff', 
    borderRightColor: '#D81B60', 
    borderBottomColor: '#D81B60', 
    padding: 2 
  },
  titleBar: { backgroundColor: '#D81B60', padding: 4 },
  titleText: { color: 'white', fontFamily: 'monospace', fontWeight: 'bold', fontSize: 12 },
  innerContent: { padding: 20, alignItems: 'center' },
  header: { fontSize: 18, fontFamily: 'monospace', marginBottom: 20, color: '#D81B60', textAlign: 'center' },
  btn: { backgroundColor: '#FFD1DC', borderWidth: 2, borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#D81B60', borderBottomColor: '#D81B60', paddingHorizontal: 20 },
  btnTitle: { color: '#D81B60', fontWeight: 'bold', fontFamily: 'monospace' }
});
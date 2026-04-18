import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from '@rneui/themed';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.window}>
        <View style={styles.titleBar}><Text style={styles.titleText}>LOGIN.EXE</Text></View>
        <Text style={styles.header}>Ready for the Quiz?</Text>
        <Button 
          title="START QUIZ" 
          onPress={() => navigation.navigate('Question', { index: 0, userAnswers: [] })}
          buttonStyle={styles.btn}
          titleStyle={styles.btnTitle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFB6C1', justifyContent: 'center', alignItems: 'center' },
  window: { width: '85%', backgroundColor: '#FFF0F5', borderWidth: 3, borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#D81B60', borderBottomColor: '#D81B60', padding: 4 },
  titleBar: { backgroundColor: '#D81B60', alignSelf: 'stretch', padding: 5, marginBottom: 20 },
  titleText: { color: 'white', fontFamily: 'monospace', fontWeight: 'bold' },
  header: { fontSize: 20, fontFamily: 'monospace', marginBottom: 20, color: '#D81B60', textAlign: 'center' },
  btn: { backgroundColor: '#FFD1DC', borderWidth: 2, borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#D81B60', borderBottomColor: '#D81B60' },
  btnTitle: { color: '#D81B60', fontWeight: 'bold', fontFamily: 'monospace' }
});
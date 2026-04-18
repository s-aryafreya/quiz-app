import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Question from './screens/Question';
import Summary from './screens/Summary';

// Correct Answers for Sample Data:
// 1. "multiple-choice": Choice 1 (index 0) is "The Sun"
// 2. "multiple-answer": Choice 1 (index 0) and Choice 3 (index 2) are "Mars" and "Jupiter"
// 3. "true-false": Choice 2 (index 1) is "False"

const quizData = [
  {
    prompt: "What is at the center of our solar system?",
    type: "multiple-choice",
    choices: ["The Sun", "The Earth", "A Black Hole", "The Moon"],
    correct: 0
  },
  {
    prompt: "Which of these are planets?",
    type: "multiple-answer",
    choices: ["Mars", "The Sun", "Jupiter", "Pluto"],
    correct: [0, 2]
  },
  {
    prompt: "The Earth is flat.",
    type: "true-false",
    choices: ["True", "False"],
    correct: 1
  }
];

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#c0c0c0' }, headerTitleStyle: { fontWeight: 'bold' } }}>
        <Stack.Screen 
          name="Question" 
          component={Question} 
          initialParams={{ data: quizData, index: 0, userAnswers: [] }} 
          options={{ title: "Retro Quiz v0.7" }}
        />
        <Stack.Screen name="Summary" component={Summary} options={{ title: "Results" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { Question, Summary };
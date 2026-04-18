import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Questions from './screens/Questions'; 
import Summary from './screens/Summary';

const quizData = [
  {
    prompt: "What is at the center of our solar system?",
    type: "multiple-choice",
    choices: ["The Sun", "The Earth", "A Black Hole", "The Moon"],
    correct: 0
  },
  {
    prompt: "Which of these are planets? (Select 2)",
    type: "multiple-answer",
    choices: ["Mars", "The Sun", "Jupiter", "The Moon"],
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
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{ 
          headerStyle: { backgroundColor: '#FFD1DC' },
          headerTitleStyle: { fontWeight: 'bold', fontFamily: 'monospace', color: '#D81B60' } 
        }}
      >
        <Stack.Screen name="Home" component={Home} options={{ title: "Welcome" }} />
        <Stack.Screen 
          name="Question" 
          component={Questions} 
          initialParams={{ data: quizData, index: 0, userAnswers: [] }} 
          options={{ title: "Retro Quiz v0.9" }}
        />
        <Stack.Screen name="Summary" component={Summary} options={{ title: "Results" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
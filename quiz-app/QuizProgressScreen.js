import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const QuizProgressScreen = () => {
  const totalQuestions = 25;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={24} color="#015055" />
        </TouchableOpacity>
        <Text style={styles.title}>Quiz Progress</Text>
        <View style={{ width: 24 }} /> {/* Empty view for layout balance */}
      </View>

      <ScrollView contentContainerStyle={styles.progressGrid}>
        {[...Array(totalQuestions)].map((_, index) => (
          <QuestionButton 
            key={index} 
            number={index + 1} 
            status={index === 3 ? 'current' : index < 3 ? 'completed' : 'upcoming'} 
          />
        ))}
      </ScrollView>
    </View>
  );
};

const QuestionButton = ({ number, status }) => (
  <TouchableOpacity 
    style={[
      styles.questionButton, 
      status === 'completed' && styles.completedQuestion,
      status === 'current' && styles.currentQuestion
    ]}
  >
    <Text style={[
      styles.questionNumber,
      status === 'completed' && styles.completedQuestionText,
      status === 'current' && styles.currentQuestionText
    ]}>
      {number}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#015055',
  },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  questionButton: {
    width: '18%',
    aspectRatio: 1,
    backgroundColor: '#E1F396',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  completedQuestion: {
    backgroundColor: '#015055',
  },
  currentQuestion: {
    backgroundColor: '#E1F396',
    borderWidth: 2,
    borderColor: '#015055',
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#015055',
  },
  completedQuestionText: {
    color: '#FFFFFF',
  },
  currentQuestionText: {
    color: '#015055',
  },
});

export default QuizProgressScreen;
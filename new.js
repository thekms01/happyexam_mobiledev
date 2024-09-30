import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView, LayoutAnimation, UIManager } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
        <Stack.Screen name="QuizProgress" component={QuizProgressScreen} />
        <Stack.Screen name="Question" component={QuestionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// HomeScreen component
const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.greeting}>Hello</Text>
        <Text style={styles.name}>Brooklyn Simmons</Text>
        
        <Text style={styles.question}>
          What Subject do you want to improve today?
        </Text>
        
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={20} color="#015055" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search here"
            placeholderTextColor="#015055"
          />
        </View>
        
        <View style={styles.subjectsGrid}>
          <SubjectButton icon="cube-outline" label="Biology" onPress={() => navigation.navigate('Question', { subject: 'Biology' })} />
          <SubjectButton icon="atom" label="Physics" onPress={() => navigation.navigate('Question', { subject: 'Physics' })} />
          <SubjectButton icon="flask" label="Chemistry" onPress={() => navigation.navigate('Question', { subject: 'Chemistry' })} />
          <SubjectButton icon="function" label="Maths" onPress={() => navigation.navigate('Question', { subject: 'Maths' })} />
        </View>
        
        <View style={styles.navbar}>
          <NavButton icon="home" active />
          <NavButton icon="chart-bar" onPress={() => navigation.navigate('Leaderboard')} />
          <NavButton icon="heart-outline" onPress={() => navigation.navigate('QuizProgress')} />
          <NavButton icon="account-outline" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const SubjectButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.subjectButton} onPress={onPress}>
    <Icon name={icon} size={30} color="#015055" />
    <Text style={styles.subjectLabel}>{label}</Text>
  </TouchableOpacity>
);

const NavButton = ({ icon, active, onPress }) => (
  <TouchableOpacity 
    style={[styles.navButton, active && styles.activeNavButton]}
    onPress={onPress}
  >
    <Icon name={icon} size={24} color={active ? "#015055" : "#88A1A3"} />
  </TouchableOpacity>
);

// QuestionScreen component
const QuestionScreen = ({ route, navigation }) => {
  const { subject } = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const totalQuestions = 10;

  const questions = {
    Physics: [
      {
        text: "What is the SI unit of electric current?",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
        answer: 1,
      },
      {
        text: "Which of these is a good conductor of electricity?",
        options: ["Rubber", "Wood", "Copper", "Plastic"],
        answer: 2,
      },
      {
        text: "What does an ammeter measure?",
        options: ["Voltage", "Current", "Resistance", "Power"],
        answer: 1,
      },
      {
        text: "In which direction does conventional current flow?",
        options: ["Positive to negative", "Negative to positive", "Both directions", "No direction"],
        answer: 0,
      },
      {
        text: "What is the formula for Ohm's Law?",
        options: ["V = IR", "I = VR", "R = VI", "P = VI"],
        answer: 0,
      },
      {
        text: "Which component is used to control the flow of current in a circuit?",
        options: ["Battery", "Bulb", "Switch", "Wire"],
        answer: 2,
      },
      {
        text: "What is the unit of electrical resistance?",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
        answer: 2,
      },
      {
        text: "Which of these is an insulator?",
        options: ["Silver", "Gold", "Rubber", "Aluminum"],
        answer: 2,
      },
      {
        text: "What does a voltmeter measure?",
        options: ["Current", "Voltage", "Resistance", "Power"],
        answer: 1,
      },
      {
        text: "How are resistors connected in a series circuit?",
        options: ["Side by side", "One after another", "In a triangle", "In a square"],
        answer: 1,
      },
    ],
    Maths: [
      {
        text: "What is the value of π (pi) to two decimal places?",
        options: ["3.14", "3.16", "3.12", "3.18"],
        answer: 0,
      },
      {
        text: "What is the square root of 144?",
        options: ["10", "12", "14", "16"],
        answer: 1,
      },
      {
        text: "What is the result of 5 + 3 × 2?",
        options: ["16", "11", "13", "10"],
        answer: 1,
      },
      {
        text: "Which of these numbers is a prime number?",
        options: ["15", "21", "29", "35"],
        answer: 2,
      },
      {
        text: "What is the area of a rectangle with length 8 cm and width 5 cm?",
        options: ["13 cm²", "26 cm²", "40 cm²", "80 cm²"],
        answer: 2,
      },
      {
        text: "What is the next number in the sequence: 2, 4, 8, 16, ...?",
        options: ["24", "28", "30", "32"],
        answer: 3,
      },
      {
        text: "What is 25% of 80?",
        options: ["15", "20", "25", "30"],
        answer: 1,
      },
      {
        text: "If x + 5 = 12, what is the value of x?",
        options: ["5", "6", "7", "8"],
        answer: 2,
      },
      {
        text: "What is the sum of angles in a triangle?",
        options: ["90°", "180°", "270°", "360°"],
        answer: 1,
      },
      {
        text: "What is the result of 2³?",
        options: ["4", "6", "8", "16"],
        answer: 2,
      },
    ],
    Chemistry: [
      {
        text: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        answer: 2,
      },
      {
        text: "What is the pH of pure water?",
        options: ["0", "7", "14", "10"],
        answer: 1,
      },
      {
        text: "Which of these is a noble gas?",
        options: ["Oxygen", "Nitrogen", "Helium", "Hydrogen"],
        answer: 2,
      },
      {
        text: "What is the most abundant element in the Earth's atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Argon"],
        answer: 1,
      },
      {
        text: "What is the chemical formula for water?",
        options: ["H2O", "CO2", "NaCl", "CH4"],
        answer: 0,
      },
      {
        text: "Which of these is an acid?",
        options: ["NaOH", "KOH", "HCl", "NH3"],
        answer: 2,
      },
      {
        text: "What is the atomic number of carbon?",
        options: ["4", "6", "8", "12"],
        answer: 1,
      },
      {
        text: "Which of these is a greenhouse gas?",
        options: ["Nitrogen", "Oxygen", "Argon", "Methane"],
        answer: 3,
      },
      {
        text: "What is the main component of natural gas?",
        options: ["Ethane", "Propane", "Methane", "Butane"],
        answer: 2,
      },
      {
        text: "Which of these is not a state of matter?",
        options: ["Solid", "Liquid", "Gas", "Energy"],
        answer: 3,
      },
    ],
    Biology: [
      {
        text: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic reticulum"],
        answer: 1,
      },
      {
        text: "Which of these is not a type of blood cell?",
        options: ["Red blood cells", "White blood cells", "Platelets", "Stem cells"],
        answer: 3,
      },
      {
        text: "What is the largest organ in the human body?",
        options: ["Heart", "Brain", "Liver", "Skin"],
        answer: 3,
      },
      {
        text: "Which of these is not a part of the digestive system?",
        options: ["Stomach", "Small intestine", "Lungs", "Large intestine"],
        answer: 2,
      },
      {
        text: "What is the process by which plants make their own food?",
        options: ["Respiration", "Photosynthesis", "Fermentation", "Digestion"],
        answer: 1,
      },
      {
        text: "Which of these is not a type of muscle?",
        options: ["Skeletal", "Cardiac", "Smooth", "Elastic"],
        answer: 3,
      },
      {
        text: "What is the main function of red blood cells?",
        options: ["Fight infections", "Carry oxygen", "Clot blood", "Produce antibodies"],
        answer: 1,
      },
      {
        text: "Which of these is not a part of the central nervous system?",
        options: ["Brain", "Spinal cord", "Nerves", "Cerebellum"],
        answer: 2,
      },
      {
        text: "What is the process of cell division called?",
        options: ["Mitosis", "Meiosis", "Cytokinesis", "Prophase"],
        answer: 0,
      },
      {
        text: "Which of these is not a type of tissue?",
        options: ["Epithelial", "Connective", "Muscular", "Skeletal"],
        answer: 3,
      },
    ],
  };

  const currentSubjectQuestions = questions[subject] || [];

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.create(
      300,
      LayoutAnimation.Types.easeInEaseOut,
      LayoutAnimation.Properties.opacity
    ));
  }, [currentQuestion]);

  const handleOptionSelect = (index) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < currentSubjectQuestions.length - 1) {
      LayoutAnimation.configureNext(LayoutAnimation.create(
        300,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      ));
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.questionScreenSafeArea}>
      <View style={styles.questionScreenContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerContent} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#015055" />
          </TouchableOpacity>
          <Text style={[styles.title, styles.headerContent]}>{subject}</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }]} />
        </View>

        <Text style={styles.questionProgress}>{`${currentQuestion + 1}/${totalQuestions}`}</Text>
        
        {currentSubjectQuestions.length > 0 ? (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {currentQuestion + 1}. {currentSubjectQuestions[currentQuestion].text}
            </Text>
            <View style={styles.optionsContainer}>
              {currentSubjectQuestions[currentQuestion].options.map((option, index) => (
                <TouchableOpacity 
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedOption === index && styles.selectedOption,
                    selectedOption !== null && index === currentSubjectQuestions[currentQuestion].answer && styles.correctOption,
                    selectedOption !== null && selectedOption === index && selectedOption !== currentSubjectQuestions[currentQuestion].answer && styles.wrongOption,
                  ]}
                  onPress={() => handleOptionSelect(index)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.optionIndex}>{String.fromCharCode(65 + index)}</Text>
                  <Text style={[
                    styles.optionText,
                    selectedOption !== null && index === currentSubjectQuestions[currentQuestion].answer && styles.correctOptionText,
                    selectedOption !== null && selectedOption === index && selectedOption !== currentSubjectQuestions[currentQuestion].answer && styles.wrongOptionText,
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <Text style={styles.noQuestionsText}>No questions available for this subject.</Text>
        )}
        
        <TouchableOpacity 
          style={[styles.nextButton, selectedOption === null && styles.disabledButton]} 
          onPress={handleNextQuestion}
          disabled={selectedOption === null}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// LeaderboardScreen component
const LeaderboardScreen = ({ navigation }) => {
  const [timeFrame, setTimeFrame] = useState('weekly');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#015055" />
          </TouchableOpacity>
          <Text style={styles.title}>Leaderboard</Text>
          <TouchableOpacity>
            <Icon name="share-variant" size={24} color="#015055" />
          </TouchableOpacity>
        </View>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, timeFrame === 'weekly' && styles.activeToggle]}
            onPress={() => setTimeFrame('weekly')}
          >
            <Text style={[styles.toggleText, timeFrame === 'weekly' && styles.activeToggleText]}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, timeFrame === 'allTime' && styles.activeToggle]}
            onPress={() => setTimeFrame('allTime')}
          >
            <Text style={[styles.toggleText, timeFrame === 'allTime' && styles.activeToggleText]}>All Time</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.leaderboard}>
          <LeaderboardItem rank={2} name="Leslie" score="2" />
          <LeaderboardItem rank={1} name="You" score="1" isUser={true} />
          <LeaderboardItem rank={3} name="Alex" score="3" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const LeaderboardItem = ({ rank, name, score, isUser = false }) => (
  <View style={[styles.leaderboardItem, isUser && styles.userItem]}>
    <View style={styles.rankContainer}>
      <Text style={styles.rankText}>{rank}</Text>
    </View>
    <Image
      source={{ uri: 'https://via.placeholder.com/50' }}
      style={styles.avatar}
    />
    <Text style={styles.name}>{name}</Text>
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreText}>{score}</Text>
    </View>
  </View>
);

// QuizProgressScreen component
const QuizProgressScreen = ({ navigation }) => {
  const totalQuestions = 25;

  return (
    <SafeAreaView style={styles.quizProgressSafeArea}>
      <View style={styles.quizProgressContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#015055" />
          </TouchableOpacity>
          <Text style={styles.title}>Quiz Progress</Text>
          <View style={{ width: 24 }} />
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
    </SafeAreaView>
  );
};

const QuestionButton = ({ number, status }) => (
  <TouchableOpacity 
    style={[
      styles.questionButton, 
      status === 'completed' && styles.completedQuestion,
      status === 'current' && styles.currentQuestion,
      status === 'upcoming' && styles.upcomingQuestion
    ]}
  >
    <Text style={[
      styles.questionNumber,
      status === 'completed' && styles.completedQuestionText,
      status === 'current' && styles.currentQuestionText,
      status === 'upcoming' && styles.upcomingQuestionText
    ]}>
      {number}
    </Text>
  </TouchableOpacity>
);

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E1F396'
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  greeting: {
    fontSize: 24,
    color: '#015055'
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#015055',
    marginBottom: 20,
  },
  question: {
    fontSize: 20,
    color: '#015055',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: '#015055',
    marginLeft: 10,
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  subjectButton: {
    width: '48%',
    height: 300,
    aspectRatio: 0.75,
    backgroundColor: 'hsl(71, 80%, 87%)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  subjectLabel: {
    color: '#015055',
    marginTop: 5,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 10,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  navButton: {
    padding: 10,
  },
  activeNavButton: {
    backgroundColor: '#E1F396',
    borderRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContent: {
    marginTop: 30,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#015055'
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 5,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#015055',
    borderRadius: 20,
  },
  toggleText: {
    color: '#015055',
    fontWeight: 'bold'
  },
  activeToggleText: {
    color: '#FFFFFF'
  },
  leaderboard: {
    alignItems: 'center'
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    width: '100%'
  },
  userItem: {
    backgroundColor: '#015055'
  },
  rankContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E1F396',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rankText: {
    color: '#015055',
    fontWeight: 'bold'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  scoreContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E1F396',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    color: '#015055',
    fontWeight: 'bold'
  },
  quizProgressSafeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  quizProgressContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#FFFFFF'
  },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  questionButton: {
    width: '16%',
    height: "16%",
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10
  },
  completedQuestion: {
    backgroundColor: '#E1F396'
  },
  currentQuestion: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#015055'
  },
  upcomingQuestion: {
    borderWidth: 2,
    borderColor: 'hsl(0,0%,90%)'
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  completedQuestionText: {
    color: '#015055'
  },
  currentQuestionText: {
    color: '#015055',
    fontWeight: 'bold'
  },
  upcomingQuestionText: {
    color: '#015055'
  },
  questionScreenSafeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  questionScreenContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: '100%',
    marginTop: 50,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#015055',
    marginBottom: 20,
  },
  optionsContainer: {
    width: '100%',
    marginTop: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 14,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#e5e5e5',
    borderBottomWidth: 4,
  },
  optionIndex: {
    fontSize: 14,
    fontWeight: '500',
    color: '#e5e5e5',
    borderWidth: 2,
    borderColor: '#e5e5e5',
    borderRadius: 5,
    padding: 2,
    paddingHorizontal: 5,
    marginRight: 10,
    textAlign: 'center'
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    letterSpacing: 0.5,
  },
  selectedOption: {
    backgroundColor: '#E1F396',
    borderColor: '#015055',
    borderBottomColor: '#013f42'
  },
  correctOption: {
    backgroundColor: '#d7ffb8',
    borderColor: 'rgb(165, 237, 110)',
    borderBottomColor: 'rgb(139, 201, 93)'
  },
  correctOptionText: {
    color: '#58a700'
  },
  wrongOption: {
    backgroundColor: '#ffebeb',
    borderColor: '#d32f2f',
    borderBottomColor: '#b71c1c'
  },
  wrongOptionText: {
    color: '#d32f2f'
  },
  nextButton: {
    backgroundColor: '#84d8ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#84d8ff',
    borderBottomWidth: 4,
    borderBottomColor: '#3aa0d1'
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  disabledButton: {
    opacity: 0.5
  },
  noQuestionsText: {
    fontSize: 18,
    color: '#015055',
    textAlign: 'center'
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: 'hsl(0, 0%, 85%)',
    borderRadius: 5,
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#58a700',
    borderRadius: 5,
  },
  questionProgress: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#58a700',
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  subjectInfo: {
    fontSize: 14,
    color: '#015055',
    marginBottom: 10,
    textAlign: 'center'
  },
  headerContent: {
    marginTop: 50,
    marginBottom: 10,
  }

  
});

export default App;


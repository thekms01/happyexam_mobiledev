import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  return (
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
        <SubjectButton icon="cube-outline" label="Geometry" />
        <SubjectButton icon="atom" label="Physics" />
        <SubjectButton icon="flask" label="Chemistry" />
        <SubjectButton icon="function" label="Maths" />
      </View>
      
      <View style={styles.navbar}>
        <NavButton icon="home" active />
        <NavButton icon="chart-bar" />
        <NavButton icon="heart-outline" />
        <NavButton icon="account-outline" />
      </View>
    </View>
  );
};

const SubjectButton = ({ icon, label }) => (
  <TouchableOpacity style={styles.subjectButton}>
    <Icon name={icon} size={30} color="#015055" />
    <Text style={styles.subjectLabel}>{label}</Text>
  </TouchableOpacity>
);

const NavButton = ({ icon, active }) => (
  <TouchableOpacity style={[styles.navButton, active && styles.activeNavButton]}>
    <Icon name={icon} size={24} color={active ? "#015055" : "#88A1A3"} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1F396',
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    color: '#015055',
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
    justifyContent: 'space-between',
  },
  subjectButton: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
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
});

export default HomeScreen;
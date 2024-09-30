import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LeaderboardScreen = () => {
  const [timeFrame, setTimeFrame] = useState('weekly');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1F396',
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
    fontWeight: 'bold',
  },
  activeToggleText: {
    color: '#FFFFFF',
  },
  leaderboard: {
    alignItems: 'center',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  userItem: {
    backgroundColor: '#015055',
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
    fontWeight: 'bold',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    flex: 1,
    color: '#015055',
    fontWeight: 'bold',
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
    fontWeight: 'bold',
  },
});

export default LeaderboardScreen;
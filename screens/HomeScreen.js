import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.tvmaze.com/search/shows?q=all')
      .then((response) => setMovies(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <ImageBackground
      source={{ uri: 'https://example.com/background.jpg' }} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.headerText}>Discover Movies</Text>
        <TextInput
          placeholder="Search movies..."
          placeholderTextColor="#ccc"
          style={styles.searchBar}
          onFocus={() => navigation.navigate('Search')}
        />
        <FlatList
          data={movies}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', { movie: item.show })}
              style={styles.cardWrapper}
            >
              <MovieCard movie={item.show} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.list}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent overlay
    padding: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6F61',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#555',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  cardWrapper: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

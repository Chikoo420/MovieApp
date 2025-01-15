import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchMovies = (text) => {
    setQuery(text);
    if (text.trim()) {
      setIsSearching(true);
      axios
        .get(`https://api.tvmaze.com/search/shows?q=${text}`)
        .then((response) => {
          setMovies(response.data);
          setIsSearching(false);
        })
        .catch((error) => {
          console.error(error);
          setIsSearching(false);
        });
    } else {
      setMovies([]);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://example.com/background.jpg' }} // Replace with your background image URL
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.headerText}>Search Movies</Text>
        <TextInput
          placeholder="Type movie name..."
          placeholderTextColor="#ccc"
          style={styles.searchBar}
          value={query}
          onChangeText={searchMovies}
        />
        {isSearching ? (
          <Text style={styles.loadingText}>Searching...</Text>
        ) : (
          <FlatList
            data={movies}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Details', { movie: item.show })
                }
                style={styles.cardWrapper}
              >
                <MovieCard movie={item.show} />
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              query.trim() && (
                <Text style={styles.emptyText}>
                  No movies found for "{query}"
                </Text>
              )
            }
            contentContainerStyle={movies.length === 0 ? styles.emptyContainer : null}
          />
        )}
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent overlay for better contrast
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
  loadingText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

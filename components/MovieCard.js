import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function MovieCard({ movie, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: movie.image?.medium }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.name}</Text>
        <Text numberOfLines={2}>{movie.summary}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', margin: 10, borderWidth: 1, borderRadius: 5 },
  image: { width: 100, height: 150 },
  info: { flex: 1, padding: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
});

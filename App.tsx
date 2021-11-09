import React, { useEffect } from 'react';
import {
  StyleSheet, Text, SafeAreaView, View, FlatList, Image, StatusBar, Platform
} from 'react-native';

const baseUrl = 'https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/'
const movieSuffix = 'movies.json'
const posterSuffix = 'public/images/'

type Movie = {
  title: string,
  episode_number: string,
  main_characters: string[],
  description: string,
  poster: string,
  hero_image: string,
}

export default function App() {
  const [movies, setMovies] = React.useState<Movie[]>([])

  useEffect(() => {
    (async() => {
      const response = await fetch(`${baseUrl}${movieSuffix}`)
      const data = await response.json()
      setMovies(data.movies)
    })()
  }, [])

  const renderMovie = ({ item }: { item: Movie }) => (
    <View>
      <Text>{item.title}</Text>
      <Text>{item.episode_number}</Text>
      <Image
        style={styles.poster}
        source={{ uri: `${baseUrl}${posterSuffix}${item.poster}` }}
      />
    </View>
  );

  return (
    <SafeAreaView  style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.episode_number}
      />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  poster: {
    width: 100,
    height: 100,
  }
});

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
    <View style={styles.movie}>
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.movieEpisode}>Episode: {item.episode_number}</Text>
      <Image
        style={styles.poster}
        source={{ uri: `${baseUrl}${posterSuffix}${item.poster}` }}
      />
    </View>
  );

  return (
    <SafeAreaView  style={styles.container}>
      <Text style={styles.appTitle}>Star Wars Movies</Text>
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
    backgroundColor: '#B42304',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  appTitle: {
    fontSize: 36,
    color: '#fff',
    paddingTop: 10,
  },
  movie: {
    backgroundColor: '#D85336',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    color: '#fff',
    padding: 10,
  },
  movieTitle: {
    // fontSize:
    fontWeight: 'bold',
    color: '#fff',
  },
  movieEpisode: {
    color: '#fff',
  },
  poster: {
    width: 100,
    height: 100,
    marginTop: 20,
  }
});

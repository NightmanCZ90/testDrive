import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, SafeAreaView, View, FlatList, Image, StatusBar, Platform, TouchableOpacity
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
  const [movies, setMovies] = useState<Movie[]>([])
  const [isAscending, setIsAscending] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const sortMovies = (movies: Movie[]) => {
    if (!isAscending) setMovies(movies.sort((a, b) => (a.title > b.title) ? 1 : -1))
    if (isAscending) setMovies(movies.sort((a, b) => (a.title > b.title) ? -1 : 1))
    setIsAscending(!isAscending)
   }

  useEffect(() => {
    (async() => {
      try {
        const response = await fetch(`${baseUrl}${movieSuffix}`)
        const data = await response.json()
        sortMovies(data.movies)
        setError(false)
      } catch (err) {
        console.log(err)
        setError(true)
      }
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
      <Text style={styles.errorMessage}>{error && 'Something went wrong'}</Text>
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.episode_number}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => sortMovies(movies)}
      >
        <Text style={styles.buttonText}>Sort movies</Text>
      </TouchableOpacity>
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
  errorMessage: {
    color: 'yellow',
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
  },
  button: {
    marginTop: 15,
    width: '100%',
    height: 50,
    backgroundColor: '#C59018',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 26,
    color: '#fff',
  },
});

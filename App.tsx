import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList } from 'react-native';

const url = 'https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/movies.json'

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
      const response = await fetch(url)
      const data = await response.json()
      console.log(data.movies)
      setMovies(data.movies)
    })()
  }, [])

  const renderMovie = ({ item }: any) => (
    <View>
      <Text>{item.title}</Text>
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
  },
});

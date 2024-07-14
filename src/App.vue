<script setup>
import { useMovieStore } from './stores/MovieStore'
import MovieInfo from './components/MovieInfo.vue'
import SearchMovie from './components/SearchMovie.vue'

const movieStore = useMovieStore()

const setTab = (id) => {
  movieStore.setActiveTab(id)
}
</script>

<template>
  <main>
    <header class="header">
      <img src="/logo.svg" alt="Любимые фильмы" class="header-logo">
      <h2>Любимые фильмы</h2>
    </header>

    <div class="tabs">
      <button
        :class="['btn', {btn_green: movieStore.activeTab === 1}]"
        @click="setTab(1)"
      >Избранное</button>
      <button
        :class="['btn', {btn_green: movieStore.activeTab === 2}]"
        @click="setTab(2)"
      >Поиск</button>
    </div>

    <div class="movies" v-if="movieStore.activeTab === 1">
      <div>
        <h3>Просмотренные фильмы ({{ movieStore.watchedMovies.length }})</h3>
        <MovieInfo
          v-for="movie of movieStore.watchedMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>

      <h3>Все фильмы ({{ movieStore.totalCountMovies }})</h3>
      <MovieInfo
        v-for="movie of movieStore.movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>

    <div class="search" v-else-if="movieStore.activeTab === 2">
      <SearchMovie />
    </div>
  </main>
</template>

<style lang="css">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.header-logo {
  max-width: 50px;
  margin-right: 10px;
}
.btn {
  border: none;
  width: 100px;
  height: 40px;
  font-size: 14px;
  margin: 0 10px;
  border-radius: 10px;
  cursor: pointer;
  background: #efefef;
}
.btn:hover {
  opacity: 0.7;
}
.btn_green {
  background: #37df5c;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
</style>

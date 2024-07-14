<script setup>
import { ref } from 'vue'
import { useSearchStore } from '../stores/SearchStore'
import SearchLoader from './SearchLoader.vue'
import MovieInfo from './MovieInfo.vue'

const searchMovie = ref('')
const searchStore = useSearchStore()
</script>

<template>
    <form @submit.prevent="searchStore.getMovies(searchMovie)">
        <input
            type="text"
            class="search-input"
            placeholder="Название фильма"
            v-model="searchMovie"
        ></input>
    </form>

    <SearchLoader v-if="searchStore.loader" />

    <div v-else>
        <MovieInfo
            v-for="movie of searchStore.movies"
            :key="movie.id"
            :movie="movie"
            :is-search="true"
        />
    </div>
</template>

<style scoped>
.search-input {
  border: 1px solid #e7e7e7;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 20px;
  border-radius: 10px;
}
</style>
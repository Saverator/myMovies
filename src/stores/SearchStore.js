import { defineStore } from 'pinia'
import { useMovieStore } from './MovieStore'
import axios from 'axios'
import { ref } from 'vue'

const url = 'https://api.kinopoisk.dev/v1.4/movie/search'

// export const useSearchStore = defineStore('searchStore', {
//     state: () => ({
//         movies: [],
//         loader: false
//     }),
//     actions: {
        // async getMovies(search) {
        //     try {
        //         this.loader = true
        //         const res = await axios.get(`${url}`, {
        //             headers: {
        //                 'accept': 'application/json',
        //                 'X-API-KEY': 'J9RQ7PY-13JM062-JVP9F6P-QKJ08ZE'
        //             },
        //             params: {
        //                 'query': search
        //             }
        //         })

        //         const data = res.data
        //         this.movies = data.docs
        //         this.loader = false
        //     } catch(err) {
        //         console.log(err)
        //     }
        // },
//         addToUserMovies(movie) {
//             const movieStore = useMovieStore()
//             movieStore.movies.push({...movie, isWatched: false})
//             movieStore.activeTab = 1
//         }
//     }
// })

export const useSearchStore = defineStore('searchStore', () => {
    const movies = ref([])
    const loader = ref(false)

    const getMovies = async(search) => {
        try {
            loader.value = true
            const res = await axios.get(`${url}`, {
                headers: {
                    'accept': 'application/json',
                    'X-API-KEY': 'J9RQ7PY-13JM062-JVP9F6P-QKJ08ZE'
                },
                params: {
                    'query': search
                }
            })

            const data = res.data
            movies.value = data.docs
            loader.value = false
        } catch(err) {
            console.log(err)
        }
    }

    const addToUserMovies = (movie) => {
        const movieStore = useMovieStore()
        movieStore.movies.push({...movie, isWatched: false})
        movieStore.activeTab = 1
    }

    return {
        loader,
        movies,
        getMovies,
        addToUserMovies
    }
})
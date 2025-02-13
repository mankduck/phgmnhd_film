import axios from "axios";

const client = axios.create({
    baseURL: 'https://phimapi.com/',
    headers: {
        'Content-Type': 'application/json'
    }
})

const movieAPI = {
    // get
    getMovieNewUpdate: (page) => client.get(`danh-sach/phim-moi-cap-nhat?page=${page}`),
    getSingleMovies: (page) => client.get(`v1/api/danh-sach/phim-le?page=${page}`),
    getSerieMovies: (page) => client.get(`v1/api/danh-sach/phim-bo?page=${page}`),
    getMovieDetail: (slug) => client.get(`phim/${slug}`),
    getMovieByKeyword: (keyword) => client.get(`v1/api/tim-kiem?keyword=${keyword}`),
}

client.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);
export default movieAPI
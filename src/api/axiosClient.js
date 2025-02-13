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
    getSingleMovies: (page) => client.get(`v1/api/danh-sach/phim-le?page=${page}&limit=12`),
    getSerieMovies: (page) => client.get(`v1/api/danh-sach/phim-bo?page=${page}&limit=12`),
    getTVShows: (page) => client.get(`v1/api/danh-sach/tv-shows?page=${page}&limit=12`),
    getCartoon: (page) => client.get(`v1/api/danh-sach/hoat-hinh?page=${page}&limit=12`),
    getMovieDetail: (slug) => client.get(`phim/${slug}`),
    getMovieByKeyword: (keyword, page) => client.get(`v1/api/tim-kiem?keyword=${keyword}&limit=12&page=${page}`),
}

client.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);
export default movieAPI
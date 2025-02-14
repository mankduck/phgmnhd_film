import axios from "axios";

const client = axios.create({
    baseURL: 'https://phimapi.com/',
    headers: {
        'Content-Type': 'application/json'
    }
})

const movieAPI = {
    getCategory: () => client.get('the-loai'),
    getCategoriesMovies: (slug, page) => client.get(`v1/api/the-loai/${slug}?page=${page}&limit=12`),
    getCountryMovies: (slug, page) => client.get(`v1/api/quoc-gia/${slug}?page=${page}&limit=12`),
    getCountry: () => client.get('quoc-gia'),
    // getYear: () => client.get('year'),
    getMovieNewUpdate: (page) => client.get(`danh-sach/phim-moi-cap-nhat?page=${page}`),
    getSingleMovies: (page, param) => client.get(`v1/api/danh-sach/phim-le?category=${param.category}&country=${param.country}&year=${param.year}&page=${page}&limit=12`),
    getSerieMovies: (page, param) => client.get(`v1/api/danh-sach/phim-bo?category=${param.category}&country=${param.country}&year=${param.year}&page=${page}&limit=12`),
    getCartoon: (page, param) => client.get(`v1/api/danh-sach/hoat-hinh?category=${param.category}&country=${param.country}&year=${param.year}&page=${page}&limit=12`),
    getTVShows: (page, param) => client.get(`v1/api/danh-sach/tv-shows?category=${param.category}&country=${param.country}&year=${param.year}&page=${page}&limit=12`),
    getMovieDetail: (slug) => client.get(`phim/${slug}`),
    getMovieByKeyword: (keyword, page) => client.get(`v1/api/tim-kiem?keyword=${keyword}&limit=12&page=${page}`),
    // getSingleMovies: (page) => client.get(`v1/api/danh-sach/phim-le?page=${page}&limit=12`),
    // getSerieMovies: (page) => client.get(`v1/api/danh-sach/phim-bo?page=${page}&limit=12`),
    // getCartoon: (page) => client.get(`v1/api/danh-sach/hoat-hinh?page=${page}&limit=12`),
    // getTVShows: (page) => client.get(`v1/api/danh-sach/tv-shows?page=${page}&limit=12`),
}

client.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);
export default movieAPI
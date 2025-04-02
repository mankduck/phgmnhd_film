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
    getMovieNewUpdate: (page) => client.get(`danh-sach/phim-moi-cap-nhat?page=${page}&limit=12`),
    getSingleMovies: (page, param) => client.get(`v1/api/danh-sach/phim-le?category=${param.category}&country=${param.country}&year=${param.year}&page=${page}&limit=${param.limit}`),
    getSerieMovies: (page, param) => client.get(`v1/api/danh-sach/phim-bo?category=${param.category}&country=${param.country}&year=${param.year}&page=${page}&limit=${param.limit}`),
    getCartoon: (page, param) => client.get(`v1/api/danh-sach/hoat-hinh?category=${param.category}&country=${param.country}&year=${param.year}&page=${page}&limit=${param.limit}`),
    getTVShows: (page, param) => client.get(`v1/api/danh-sach/tv-shows?category=${param.category}&country=${param.country}&year=${param.year}&page=${page}&limit=${param.limit}`),
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
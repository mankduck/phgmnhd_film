import React from 'react'
import { Route, Routes } from 'react-router-dom'

import HomePage from '../pages/Frontend/Home/HomePage'
import SingleMovie from '../pages/Frontend/Movie/SingleMovie/SingleMovie'
import MovieDetail from '../pages/Frontend/Movie/MovieDetail/MovieDetail'
import SerieMovie from '../pages/Frontend/Movie/SerieMovie/SerieMovie'
import CartoonMovie from '../pages/Frontend/Movie/Cartoon/CartoonMovie'
import TVShow from '../pages/Frontend/Movie/TVShow/TVShow'
import SearchMovie from '../pages/Frontend/Movie/SearchMovie/SearchMovie'
import ContactPage from '../pages/Frontend/Contact/ContactPage'
import CategoriesMovie from '../pages/Frontend/Movie/CategoriesMovie/CategoriesMovie'
import CountryMovie from '../pages/Frontend/Movie/CountryMovie/CountryMovie'
import Login from '../pages/Auth/Login'

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/phim-le' element={<SingleMovie />} />
            <Route path='/the-loai/:slug' element={<CategoriesMovie />} />
            <Route path='/quoc-gia/:slug' element={<CountryMovie />} />
            <Route path='/phim-bo' element={<SerieMovie />} />
            <Route path='/tv-show' element={<TVShow />} />
            <Route path='/hoat-hinh' element={<CartoonMovie />} />
            <Route path='/:category/:slug' element={<MovieDetail />} />
            <Route path="/search" element={<SearchMovie />} />
            <Route path="/lien-he" element={<ContactPage />} />
            <Route path="/dang-nhap" element={<Login />} />
        </Routes>
    )
}

export default AppRouter
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import HomePage from '../pages/Home/HomePage'
import SingleMovie from '../pages/Movie/SingleMovie/SingleMovie'
import MovieDetail from '../pages/Movie/MovieDetail/MovieDetail'
import SerieMovie from '../pages/Movie/SerieMovie/SerieMovie'
import CartoonMovie from '../pages/Movie/Cartoon/CartoonMovie'
import TVShow from '../pages/Movie/TVShow/TVShow'
import SearchMovie from '../pages/Movie/SearchMovie/SearchMovie'
import ContactPage from '../pages/Contact/ContactPage'

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/phim-le' element={<SingleMovie />} />
            <Route path='/phim-bo' element={<SerieMovie />} />
            <Route path='/tv-show' element={<TVShow />} />
            <Route path='/hoat-hinh' element={<CartoonMovie />} />
            <Route path='/:category/:slug' element={<MovieDetail />} />
            <Route path="/search" element={<SearchMovie />} />
            <Route path="/lien-he" element={<ContactPage />} />
        </Routes>
    )
}

export default AppRouter
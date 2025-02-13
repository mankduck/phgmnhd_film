import React from 'react'
import { Route, Routes } from 'react-router-dom'

import HomePage from '../pages/Home/HomePage'
import SingleMovie from '../pages/Movie/SingleMovie/SingleMovie'
import MovieDetail from '../pages/Movie/MovieDetail/MovieDetail'
import SerieMovie from '../pages/Movie/SerieMovie/SerieMovie'
import SearchMovie from '../pages/Movie/SearchMovie/SearchMovie'

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/phim-le' element={<SingleMovie />} />
            <Route path='/phim-bo' element={<SerieMovie />} />
            <Route path='/:category/:slug' element={<MovieDetail />} />
            <Route path="/search" element={<SearchMovie />} />
        </Routes>
    )
}

export default AppRouter
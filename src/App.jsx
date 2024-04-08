import { useState, useEffect } from "react"
import {fetchDataFromApi} from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from "./store/homeSlice"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Details from './pages/details/Details'
import Home from './pages/home/Home'
import Explore from './pages/explore/Explore'
import PageNotFound from './pages/404/PageNotFound'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import SearchResult from "./pages/searchResult/SearchResult"
function App() {

  const dispatch = useDispatch()
  const {url} = useSelector((state) => state.home)

  // const apiTesting = () => {
  //   fetchDataFromApi('/movie/popular')
  //   .then((res) => {
  //     console.log(res)
  //     dispatch(getApiConfiguration(res))
  //   })
  // }
  useEffect(() => {
    // apiTesting()
    fetchApiConfig()
    genresCall()
  }, [])
  const fetchApiConfig = async () => {
    const res = await fetchDataFromApi('/configuration')
      const url = {
        backdrop: res?.images?.secure_base_url + "original",
        poster: res?.images?.secure_base_url + "original",
        profile: res?.images?.secure_base_url + "original",
        
      }
      dispatch(getApiConfiguration(url))
      console.log(url)
      }

  const genresCall = async () => {
    let promises = []
    let endPoint = ["tv", 'movie']
    let allGenres = []

    endPoint.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })
    const data = await Promise.all(promises)
    data.map(({genres}) => {
      return (
        genres.map((item) => (allGenres[item.id] = item))
      )
    }) 

    dispatch(getGenres(allGenres));
  }  
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App

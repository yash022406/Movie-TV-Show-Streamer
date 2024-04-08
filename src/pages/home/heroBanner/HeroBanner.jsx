import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Img from '../../../components/lazyLoadImage/img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import './style.scss'
const HeroBanner = () => {

  const navigate = useNavigate();

  const [background, setBackground] = useState('')
  const [query, setQuery] = useState('')
  const {data, loading} = useFetch('/movie/upcoming')
  const {url} = useSelector((state) => state.home)
  useEffect(() => {
    const bg = "https://image.tmdb.org/t/p/original"+ data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg)
    console.log(bg)
  }, [data]); 

  const searchQueryHandler = (e) => {
    console.log('search button clicked')
    console.log(query)

      navigate(`/search/${query}`);

  }
   
  return (
      <div className="hero w-[100%] h-[450px] bg-[#04152d] flex items-center relative">

        {!loading && <div className="w-[100%] h-[100%] absolute top-0 left-0 opacity-50  backdrop-img">
          <Img src={background} />
        </div>}

        <div className="opacity w-[100%] h-[250px] absolute bottom-0 left-0"></div>

        <ContentWrapper>

            <div className="heroC flex flex-col items-center text-white text-center relative max-w-[800px] mx-auto">
              <span className="title text-[50px] font-bold mb-10">Welcome</span>
              <span className="subt text-[10px] font-medium mb-10">
                Millions of movies, TV shows and people to discover. Explore now.
              </span>
              <div className="searchInp flex items-center w-full">
                <input type="text"
                placeholder='Search for a movie or tv show....'
                className='text-black'
                onChange={(e) => setQuery(e.target.value)}
                value={query} />
                <button className='w-[100px] h-[50px] text-lg text-white outline-0 border-none' onClick={searchQueryHandler}>Search</button>
              </div>
            </div>

        </ContentWrapper>
      </div>
  )
}

export default HeroBanner
import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'
const TopRated = () => {

    const [endpoint, setEndpoint] = useState('movie')
    const {data, loading} = useFetch(`/${endpoint}/top_rated`)
    const onTabChange = (tab) => {
        setEndpoint(tab==='Movies'? "movie" : "tv")
    }

  return (
    <div className="carouselSection">
        <div className='flex items-center justify-between mb-5'>
            <span className="carouselTitle text-2xl text-white font-normal">Top Rated</span>
            <SwitchTabs onTabChange={onTabChange} data={["Movies", "TV Shows"]} />
        </div>
        <Carousel endpoint={endpoint} data={data?.results} loading={loading} />
    </div>
  )
}

export default TopRated
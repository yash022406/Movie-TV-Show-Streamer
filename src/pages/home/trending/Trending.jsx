import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'
const Trending = () => {

    const [endpoint, setEndpoint] = useState('day')
    const {data, loading, error} = useFetch(`/trending/all/${endpoint}`)
    console.log(data);
    const onTabChange = (tab) => {
        setEndpoint(tab==='Day'? "day" : "week")
    }

  return (
    <div className="carouselSection">
        <div className='flex items-center justify-between mb-5'>
            <span className="carouselTitle text-2xl text-white font-normal">Trending</span>
            <SwitchTabs onTabChange={onTabChange} data={["Day", "Week"]} />
        </div>
        <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  )
}

export default Trending
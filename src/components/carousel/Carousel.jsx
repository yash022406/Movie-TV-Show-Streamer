import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Genres from "../genres/Genres";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import "./style.scss";
const Carousel = ({data, loading, endpoint, title}) => {

    const carouselContainer = useRef();
    const {url} = useSelector((state) => state.home)



    const navigate = useNavigate()

    const navigation = (dir) => {
        const container = carouselContainer.current

        const scrollAmount = dir ==='left'? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth +20)

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        })

    }

    const skItem = () => {
        return(
            <div className="skeletonItem">
                <div className="posterBlock"></div>
                <div className="textBlock">
                    <div className="title"></div>
                    <div className="data"></div>
                </div>
            </div>
        )
    }

  return (
    <div className="carousel">
        <ContentWrapper>
            {title && <div className="carouselTitle">{title}</div>}
            <BsFillArrowLeftCircleFill
                className="carouselLeftNav arrow"
                onClick={() => navigation('left')}
            />
            <BsFillArrowRightCircleFill
                className="carouselRightNav arrow"
                onClick={() => navigation('right')}
            />
            {!loading? (
                <div ref={carouselContainer} className="carouselItems">
                    {data?.map((item) => {
                        const posterUrl = item?.backdrop_path;
                        console.log(posterUrl)
                        return (
                            <div onClick={()=>navigate(`/${item.media_type || endpoint}/${item.id}`)} className="carouselItem" key={item.id}>
                                <div className="posterBlock">
                                    <Img src={"https://image.tmdb.org/t/p/original" +posterUrl} />
                                    <CircleRating rating = {item.vote_average.toFixed(1)} />
                                    <Genres data={item.genre_ids.slice(0,2)} />
                                </div>
                                <div className="textBlock">
                                    <span className="title">
                                        { item.title || item.name }
                                    </span>
                                    <span className="date">
                                        {
                                            dayjs(item.release_Date).format("MMM D, YYYY")
                                        }
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                ):(
                    // <span>loading</span>
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                    
            )}
        </ContentWrapper>
    </div>
  )
}

export default Carousel
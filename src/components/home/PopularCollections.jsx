import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


import { Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Skeleton from "../ui/Skeleton"

export default function PopularCollections() {

  const [PopularCollections, setPopularCollections] = useState([])

  useEffect(() => {

    async function FetchData() {
      const info = await axios.get("https://remote-internship-api-production.up.railway.app/popularCollections")
      const newData = info.data.data
      setPopularCollections(newData)
    }

    FetchData()
  }, [])


  return (
    <section id="popular-collections">
      <div className="container">
        <div className="row">
          <h2 className="popular-collections__title">Popular Collections</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={6}
            navigation
            loop={true}
            breakpoints={{
              150: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1200: { slidesPerView: 5 },
              1600: { slidesPerView: 6 }
            }}
          >
            {PopularCollections.length === 0
            ? new Array(9).fill(0).map((_, i) => (
                <SwiperSlide key={i}>

                  <div className="collection__img">
                    <Skeleton width="100%" height="180px" borderRadius="16px" />
                  </div>

                  <div className="collection__info">
                    <Skeleton borderRadius="16px"/>
                    <div className="collection__stats">
                      <div className="collection__stat">
                        <div className="collection__stat__label">
                          <Skeleton width="50px" height="18px" borderRadius="4px"/>
                        </div>
                        <div className="collection__stat__data">
                          <Skeleton width="80px" height="18px" borderRadius="4px"/>
                        </div>
                        </div>
                        <div className="collection__stat">
                         <div className="collection__stat__label">
                          <Skeleton width="50px" height="18px" borderRadius="4px"/>
                        </div>
                        <div className="collection__stat__data">
                          <Skeleton width="80px" height="18px" borderRadius="4px"/>
                        </div>
                        </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : PopularCollections.map((NFT, index) => (
              <SwiperSlide key={index}>

                <Link to={`/collection/${NFT.collectionId}`} className="collection">
                  <img
                    src={NFT.imageLink}
                    alt=""
                    className="collection__img"
                  />
                  <div className="collection__info">
                    <h3 className="collection__name">{NFT.title}</h3>
                    <div className="collection__stats">
                      <div className="collection__stat">
                        <span className="collection__stat__label">Floor</span>
                        <span className="collection__stat__data">{(Math.floor(NFT.floor * 100) / 100).toFixed(2)} ETH</span>
                      </div>
                      <div className="collection__stat">
                        <span className="collection__stat__label">
                          Total Volume
                        </span>
                        <span className="collection__stat__data">{NFT.totalVolume} ETH</span>
                      </div>
                    </div>
                  </div>
                </Link>

              </SwiperSlide>
            ))
            
            }

          </Swiper>
        </div>
      </div>
    </section >
  );
}

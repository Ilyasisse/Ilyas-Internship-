import { faShoppingBag, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Skeleton from "../ui/Skeleton";

export default function RecommendedItems({ collectionId, currentItemId }) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [recommendedItemsInfo, setRecommendedItemsInfo] = useState([])

  

  async function FetchData() {
    const { data } = await axios.get(`https://remote-internship-api-production.up.railway.app/collection/${collectionId}`)
    setRecommendedItemsInfo(data.data.items)
    
  }
  useEffect(() => {
    if (!collectionId) return;
    FetchData()
  }, [collectionId])
  

  const filtered = recommendedItemsInfo.filter((item) => item.itemId !== currentItemId)

  return (
    <section id="recommended-items">
      <div className="container">
        <div className="row recommended-items__row">
          <div className="recommended-items__wrapper">
            <div className="recommended-items__header">
              <FontAwesomeIcon icon={faTableCells} />
              <h3 className="recommended-items__header__title">
                More from this collection
              </h3>
            </div>
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
              {recommendedItemsInfo.length === 0
              ? new Array(9).fill(0).map((_,i) => (
                <SwiperSlide>
                  <figure className="item__img__wrapper">
                    <Skeleton width="100%" height="100%" borderRadius={4}/>
                  </figure>
                  <div className="item__details">
                    <span className="item__details__name">
                      <Skeleton width={80} height={16} borderRadius={4}/>
                    </span>
                    <span className="item__details__price">
                      <Skeleton width={48} height={16} borderRadius={4}/>
                    </span>
                    <span className="item__details__last-sale">
                      <Skeleton width={120} height={16} borderRadius={4}/>
                    </span>
                  </div>
                </SwiperSlide>
              ))
              
              :filtered.slice(0, 10).map((recommendedItemsInfo, index) => (
               <SwiperSlide>
                  <Link to={`/item/${recommendedItemsInfo.itemId}`} key={index}  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="item">
                    <figure className="item__img__wrapper">
                      <img
                        src={recommendedItemsInfo.imageLink}
                        alt=""
                        className="item__img"
                      />
                    </figure>
                    <div className="item__details">
                      <span className="item__details__name">{recommendedItemsInfo.title}</span>
                      <span className="item__details__price">{recommendedItemsInfo.price} ETH</span>
                      <span className="item__details__last-sale">
                        Last sale: {recommendedItemsInfo.lastSale} ETH
                      </span>
                    </div>
                    <div className="item__see-more">
                      <button className="item__see-more__button">
                        See More
                      </button>
                      <div className="item__see-more__icon">
                        <FontAwesomeIcon icon={faShoppingBag} />
                      </div>
                    </div>
                  </Link>
              </SwiperSlide>
              ))
              }
              </Swiper>
            <div className="recommended-items__footer">
              <Link
                to={`/collection/${collectionId}`}
                className="recommended-items__footer__button"
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

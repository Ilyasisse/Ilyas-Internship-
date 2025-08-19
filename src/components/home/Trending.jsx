import React, { useEffect, useState } from "react";
import VerifiedIcon from "../../assets/verified.png";
import TrendingCollection from "../../assets/trending-collection.avif";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../ui/Skeleton"
import Aos from "aos";

export default function Trending() {




  const [trending, setTrending] = useState([])

  useEffect(() => {
    async function fetchData() {
        const info = await axios.get("https://remote-internship-api-production.up.railway.app/trendingNFTs")
        const newData = info.data.data
        setTrending(newData, [])
    }



    fetchData()

  }, [])



  const firstColumn = trending.slice(0, 5)
  const secondColumn = trending.slice(5, 10)


  return (
    <section id="trending" data-aos="fade-up">
      <div className="container">
        <div className="row trending__row">
          <div className="trending__header">
            <h2 className="trending__header__title">Trending NFTs</h2>
            <Link className="trending__header__button" to={"/collections"}>
              View All
            </Link>
          </div>
          <div className="trending__body">
            <div className="trending-column">
              <div className="trending-column__header">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">
                  Floor Price
                </div>
                <div className="trending-column__header__price">Volume</div>
              </div>
              <div className="trending-column__body">
                {trending.length === 0
                  ? new Array(5).fill(0).map((_, i) => (
                    <div key={i} className="trending-collection">
                      <div className="trending-collection__rank">
                        <Skeleton width="20px" height="20px" />
                      </div>

                      <div className="trending-collection__collection">
                        <figure className="trending-collection__img__wrapper">
                          <Skeleton width="150px" height="150px" borderRadius="12px" />
                        </figure>
                        <div className="trending-collection__name">
                          <Skeleton width="80px" height="20px" />
                        </div>
                        <div className="trending-collection__verified">
                          <Skeleton width="15px" height="15px" />
                        </div>
                      </div>

                      <div className="trending-collection__price">
                        <Skeleton width="60px" height="20px" />
                      </div>

                      <div className="trending-collection__volume">
                        <Skeleton width="60px" height="20px" />
                      </div>
                    </div>
                  ))
                  : firstColumn.map((item, index) => (
                    <Link
                      to={`/collection/${item.collectionId}`}
                      key={index}
                      className="trending-collection"
                    >
                      <div className="trending-collection__rank">{item.rank}</div>
                      <div className="trending-collection__collection">
                        <figure className="trending-collection__img__wrapper">
                          <img
                            src={item.imageLink}
                            alt=""
                            className="trending-collection__img"
                          />
                        </figure>
                        <div className="trending-collection__name">
                          {item.title}
                        </div>
                        <img
                          src={VerifiedIcon}
                          className="trending-collection__verified"
                        />
                      </div>
                      <div className="trending-collection__price">
                        <span className="trending-collection__price__span">
                          {(Math.ceil(item.floor * 100) / 100).toFixed(2)}
                        </span>
                      </div>
                      <div className="trending-collection__volume">
                        <span className="trending-collection__volume__span">
                          {item.totalVolume} ETH
                        </span>
                      </div>
                    </Link>
                  ))
                }
              </div>
            </div>
            <div className="trending-column">
              <div className="trending-column__header trending-column__header2">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">
                  Floor Price
                </div>
                <div className="trending-column__header__price">Volume</div>
              </div>
              <div className="trending-column__body">
                {trending.length === 0
                  ? new Array(5).fill(0).map((_, i) =>(


                    <div key={i} className="trending-collection">
                      <div className="trending-collection__rank">
                        <Skeleton width="20px" height="20px" />
                      </div>


                      <div className="trending-collection__collection">
                        <figure className="trending-collection__img__wrapper">
                          <Skeleton width="150px" height="150px" borderRadius="12px" />
                        </figure>
                        <div className="trending-collection__name">
                          <Skeleton width="80px" height="20px" />
                        </div>
                        <div className="trending-collection__verified">
                          <Skeleton width="15px" height="15px"/>
                        </div>
                      </div>
                      <div className="trending-collection__price">
                        <Skeleton width="60px" height="20px"/>
                      </div>

                      <div className="trending-collection__volume">
                        <Skeleton width="60px" height="20px"/>
                      </div>
                    </div>

                  ))
                  : (
                    secondColumn.map((item, index) => (
                      <Link
                        to={`/collection/${item.collectionId}`}
                        key={index}
                        className="trending-collection"
                      >
                        <div className="trending-collection__rank">{item.rank}</div>
                        <div className="trending-collection__collection">
                          <figure className="trending-collection__img__wrapper">
                            <img
                              src={item.imageLink}
                              alt=""
                              className="trending-collection__img"
                            />
                          </figure>
                          <div className="trending-collection__name">
                            {item.title}
                          </div>
                          <img
                            src={VerifiedIcon}
                            className="trending-collection__verified"
                          />
                        </div>
                        <div className="trending-collection__price">
                          <span className="trending-collection__price__span">
                            {(Math.ceil(item.floor * 100) / 100).toFixed(2)}
                          </span>
                        </div>
                        <div className="trending-collection__volume">
                          <span className="trending-collection__volume__span">
                            {item.totalVolume} ETH
                          </span>
                        </div>
                      </Link>
                    )))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

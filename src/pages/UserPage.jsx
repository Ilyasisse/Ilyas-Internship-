import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/ui/Skeleton";

export default function UserPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams()

  const [userInfo, setUserInfo] = useState({})

  const [allItems, setAllItems] = useState([])

  const [NFTamount, setNFTamount] = useState(12)

  const [sort, setSort] = useState("")

  useEffect(() => {
    async function FetchData() {
      const info = await axios.get(`https://remote-internship-api-production.up.railway.app/user/${id}`)
      const Data = info.data.data
      const item = Data.items
      setAllItems(item)
      setUserInfo(Data)
    }
    FetchData()
  }, [])

  function sortNFT() {
    if (sort === "HIGH__TO__LOW") {
      setAllItems(allItems.slice().sort((a, b) => b.price - a.price))
    }
    if (sort === "LOW__TO__HIGH") {
      setAllItems(allItems.slice().sort((a, b) => a.price - b.price))
    }
  }


  useEffect(() => {
    sortNFT()
  }, [sort])

  const isUserEmpty = userInfo === Object.keys(userInfo).length === 0;
  const areItemsEmpty = allItems.length === 0;


  if (isUserEmpty || areItemsEmpty) {
    return (
      <>
        <section id="user-info">
          <header id="user-header">
            <Skeleton width="2000px" height="500px" />
          </header>
          <div className="row">
            <div className="user-info__wrapper">
              <figure className="user-info__img__wrapper">
                <Skeleton width="300px" height="650px" />

              </figure>
              <div className="user-info__name">
                <Skeleton width={240} height={16} borderRadius={4} />
              </div>
              <div className="user-info__details">
                <span className="user-info__wallet__data">
                  <Skeleton width={300} height={16} borderRadius={4} />
                </span>
                <span className="user-info__year__data">
                  <Skeleton width={120} height={16} borderRadius={4} />
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="user-items">
          <div className="row user-items__row">
            <div className="user-items__header">
              <div className="user-items__header__text">
                <Skeleton width={120} height={16} borderRadius={4} />
              </div>
              <select className="user-items__header__sort">
                <Skeleton width={120} height={16} borderRadius={4} />
              </select>
            </div>
            <div className="user-items__body">
              {[...Array(12)].map((_, i) => (
                <div className="item-column" key={i}>
                  <div className="item">
                    <figure className="item__img__wrapper">
                      <Skeleton width="100%" height="100%" />
                    </figure>
                    <div className="item__details">
                      <span className="item__details__name">
                        <Skeleton width="80px" height="16px" borderRadius="4px" />
                      </span>
                      <span className="item__details__price">
                        <Skeleton width="48px" height="16px" borderRadius="4px" />
                      </span>
                      <span className="item__details__last-sale">
                        <Skeleton width="120px" height="16px" borderRadius="4px" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>

    )
  }



  return (
    <>
      <header
        style={{
          backgroundImage: `url('${userInfo.imageLink}')`,
        }}
        id="user-header"
      ></header>

      <section id="user-info">
        <div className="row">
          <div className="user-info__wrapper">
            <figure className="user-info__img__wrapper">
              <img
                src={userInfo.profilePicture}
                alt=""
                className="user-info__img"
              />
            </figure>
            <h1 className="user-info__name">{userInfo.name}</h1>
            <div className="user-info__details">
              <span className="user-info__wallet">
                <FontAwesomeIcon
                  icon={faEthereum}
                  className="user-info__wallet__icon"
                />
                <span className="user-info__wallet__data">{userInfo.walletCode}</span>
              </span>
              <span className="user-info__year">
                <span className="user-info__year__data">
                  Joined {userInfo.creationDate}
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="user-items">
        <div className="row user-items__row">
          <div className="user-items__header">
            <div className="user-items__header__left">
              <span className="user-items__header__text">{allItems.length} items</span>
            </div>
            <select className="user-items__header__sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="">Recently purchased</option>
              <option value="HIGH__TO__LOW">Price high to low</option>
              <option value="LOW__TO__HIGH">Price low to high</option>
            </select>
          </div>
          <div className="user-items__body">
            {allItems.slice(0, NFTamount).map((NFT, index) => (
              <div className="item-column" key={index}>
                <Link to={`/item/${NFT.itemId}`} className="item">
                  <figure className="item__img__wrapper">
                    <img
                      src={NFT.imageLink}
                      alt=""
                      className="item__img"
                    />
                  </figure>
                  <div className="item__details">
                    <span className="item__details__name">{NFT.title}</span>
                    <span className="item__details__price">{NFT.price} ETH</span>
                    <span className="item__details__last-sale">
                      Last sale: {NFT.lastSale} ETH
                    </span>
                  </div>
                  <div className="item__see-more" role="button" tabIndex={0}>
                    <div className="item__see-more__button">See More</div>
                    <div className="item__see-more__icon">
                      <FontAwesomeIcon icon={faShoppingBag} />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {NFTamount < allItems.length && (
          <button className="collection-page__button"
            onClick={() => {
              setNFTamount(prev => prev + 6)
            }}
          >Load more</button>
        )}
      </section>
    </>
  );
}

import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../ui/Skeleton";

export default function CollectionItems() {

  const {id} = useParams()

  const[CollectionItem, setCollectionItem] = useState([])

  const[amount , setAmount] = useState()

  const[NFTamount , setNFTamount] = useState(12)

  const [sort, setSort] = useState("");

  useEffect(() => {
    async function FetchData() {
      const info = await axios.get(`https://remote-internship-api-production.up.railway.app/collection/${id}`)
      const NewData = info.data.data.items
      setCollectionItem(NewData)
    }
    FetchData()
  },[])

  function sortNFT(){
    if(sort === "HIGH__TO__LOW"){
      setCollectionItem(CollectionItem.slice().sort((a,b) => b.price - a.price))
    }
    if(sort === "LOW__TO__HIGH"){
      setCollectionItem(CollectionItem.slice().sort((a,b) => a.price - b.price))
    }
  }

  useEffect(() => {
    sortNFT()
  },[sort])

  if(Object.keys(CollectionItem).length === 0 ){
    return(
      <div className="row collection-items__row">
        <div className="collection-items__header">
          <div className="collection-items__header__left">
            <div className="collection-items__header__live">
              <Skeleton width="52px" height="16px" borderRadius="4px"/>
            </div>
            <div className="collection-items__header__results">
              <Skeleton width="72px" height="16px" borderRadius="4px"/>
            </div>
          </div>
          <div className="collection-items__header__sort">
            <Skeleton width="240px" height="48px" borderRadius="8px"/>
          </div>
        </div>
        <div className="collection-items__body">
          {[...Array(NFTamount)].map((_,i) => (
            <div className="item-column">
              <div className="item">
                <figure className="item__img__wrapper">
                  <Skeleton width="100%" height="100%"/>
                </figure>
                <div className="item__details">
                  <span className="item__details__name">
                    <Skeleton width="80px" height="16px" borderRadius="4px"/>
                  </span>
                  <span className="item__details__price">
                    <Skeleton width="48px" height="16px" borderRadius="4px"/>
                  </span>
                  <span className="item__details__last-sale">
                    <Skeleton width="120px" height="16px" borderRadius="4px"/>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section id="collection-items">
      <div className="row collection-items__row">
        <div className="collection-items__header">
          <div className="collection-items__header__left">
            <span className="collection-items__header__live">
              <div className="green-pulse"></div>
              Live
            </span>
            <span className="collection-items__header__results">
              {CollectionItem?.length} results
            </span>
          </div>
          <select className="collection-items__header__sort"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          >
            <option value="" default>
              Default
            </option>
            <option value="HIGH__TO__LOW">Price high to low</option>
            <option value="LOW__TO__HIGH">Price low to high</option>
          </select>
        </div>
        <div className="collection-items__body">
          {CollectionItem.slice(0,NFTamount).map((NFT, index) => (
            <div className="item-column">
              <Link to={"/item"} key={index} className="item">
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
                <div className="item__see-more">
                  <button className="item__see-more__button">See More</button>
                  <div className="item__see-more__icon">
                    <FontAwesomeIcon icon={faShoppingBag} />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {NFTamount < CollectionItem.length&& (
        <button
         className="collection-page__button"
         onClick={() => {
          setNFTamount(prev => prev + 6)
         }}
         >Load more</button>
      )}
    </section>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../ui/Skeleton";


export default function CollectionHeader() {
  const { id } = useParams()

  const [CollectionHeader, setCollectionHeader] = useState({})

  useEffect(() => {

    async function FetchData() {
      const info = await axios.get(`https://remote-internship-api-production.up.railway.app/collection/${id}`)
      const newData = info.data.data
      setCollectionHeader(newData)
    }
    FetchData()
  }, [])

  if (Object.keys(CollectionHeader).length === 0) {

    return (<div id="collection-header">
      <Skeleton width="100%" height="100%" />
    </div>
    )
  }

  return (
    <header
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.2)), 
        url('${CollectionHeader.imageLink}')`
      }}
      id="collection-header"
    >
      <div className="row collection-header__row">
        <div className="collection-header__content">
          <div className="collection-header__left">
            <img
              src={CollectionHeader.logo}
              alt=""
              className="collection-header__img"
            />
            <div className="collection-header__name">{CollectionHeader.title}</div>
            <Link to={'/user'} className="collection-header__author">{CollectionHeader.creator}</Link>
          </div>
          <div className="collection-header__right">
            <div className="collection-header__columns">
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{CollectionHeader.totalVolume}</span> ETH
                </span>
                <span className="collection-header__column__label">
                  Total volume
                </span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{CollectionHeader.floor}</span> ETH
                </span>
                <span className="collection-header__column__label">
                  Floor price
                </span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{CollectionHeader.bestOffer}</span> ETH
                </span>
                <span className="collection-header__column__label">
                  Best offer
                </span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{CollectionHeader.listed}</span>
                </span>
                <span className="collection-header__column__label">Listed</span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{CollectionHeader.owners}</span>
                </span>
                <span className="collection-header__column__label">
                  Owners (Unique)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

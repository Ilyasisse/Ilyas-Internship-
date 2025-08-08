import React, { useEffect, useState } from "react";
import SelectedItemLogo from "../../assets/selected-collection-logo.avif";
import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../ui/SkeletonSelectedCollection";

export default function SelectedCollection() {

  const [selectedCollection, setSelectedCollection] = useState()

  useEffect(() => {


    async function fetchData() {
      try {
        const response = await axios.get("https://remote-internship-api-production.up.railway.app/selectedCollection")
        const newData = response.data.data
        setSelectedCollection(newData)
      }
      catch (error) {
        console.log("Error Ecthcing Selcted Collection", error)
      }

    }

    fetchData()

  }, [])


  if (!selectedCollection) return <Skeleton/>

  return (
    <header>
      <div className="selected-collection">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={selectedCollection.thumbnail}
          src={selectedCollection.videoLink}
          className="selected-collection__bg"
        />
        <div className="selected-collection__description">
          <img
            src={SelectedItemLogo}
            alt=""
            className="selected-collection__logo"
          />
          <h1 className="selected-collection__title">
            {selectedCollection.title}
          </h1>
          <Link to={'/user'} className="selected-collection__author">
            {selectedCollection.creator}
            <img
              src={VerifiedIcon}
              className="selected-collection__author__verified"
            />
          </Link>
          <div className="selected-collection__details">{selectedCollection.amountOfItems} items· {selectedCollection.floorPrice} ETH</div>
          <Link to={'/collection'} className="selected-collection__button">
            <div className="green-pulse"></div>
            View Collection
          </Link>
        </div>
      </div>
    </header>
  );
}

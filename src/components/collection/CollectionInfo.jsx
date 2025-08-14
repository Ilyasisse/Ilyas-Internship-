import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "../ui/Skeleton";

export default function CollectionInfo() {

  const { id } = useParams()

  const [CollectionInfo, setCollectionInfo] = useState({})

  useEffect(() => {

    async function FetchData() {
      const info = await axios.get(`https://remote-internship-api-production.up.railway.app/collection/${id}`)
      const newData = info.data.data
      setCollectionInfo(newData)
      console.log(newData)
    }
    FetchData()
  }, [])

  if (Object.keys(CollectionInfo).length === 0) {
    return (
      <div className="collection-info">
        <div className="row">
          <div className="collection-info__wrapper">
            <div className="collection-info__description">
              <Skeleton width="100%" height="16px" borderRadius="4px" margin />
              <Skeleton width="100%" height="16px" borderRadius="4px" margin />
              <Skeleton width="70%" height="16px" borderRadius="4px" margin />
            </div>
            <div className="collection-info__details">
              <div className="collection-info__detail">
                <Skeleton width="58px" height="16px" borderRadius="4px" />
              </div>
              <div className="collection-info__detail">
                <Skeleton width="120px" height="16px" borderRadius="4px" />
              </div>
              <div className="collection-info__detail">
                <Skeleton width="132px" height="16px" borderRadius="4px" />
              </div>
              <div className="collection-info__detail">
                <Skeleton width="108px" height="16px" borderRadius="4px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="collection-info">
      <div className="row">
        <div className="collection-info__wrapper">
          <p className="collection-info__description">
            {CollectionInfo.description}
          </p>
          <div className="collection-info__details">
            <span className="collection-info__detail">
              Items
              <span className="collection-info__detail__data"> {CollectionInfo.items?.length} </span>
            </span>
            ·
            <span className="collection-info__detail">
              Created
              <span className="collection-info__detail__data"> {CollectionInfo.createdDate}</span>
            </span>
            ·
            <span className="collection-info__detail">
              Creator earnings
              <span className="collection-info__detail__data"> {CollectionInfo.creatorEarnings}%</span>
            </span>
            ·
            <span className="collection-info__detail">
              Chain
              <span className="collection-info__detail__data"> {CollectionInfo.chain}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

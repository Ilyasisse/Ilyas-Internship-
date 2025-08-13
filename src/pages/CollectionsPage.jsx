import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/ui/Skeleton";

export default function CollectionsPage() {

  const [CollectionsPage, setCollectionPage] = useState([])
  const [CollectionAmount, setCollectionAmount] = useState(12)


  useEffect(() => {
    async function FetchData() {
      const info = await axios.get("https://remote-internship-api-production.up.railway.app/collections")
      const NewData = info.data.data
      setCollectionPage(NewData)
    }
    FetchData()
  }, []);


  return (
    <div className="container">
      <div className="row">
        <h1 className="collections-page__title">Collections</h1>
        <div className="collections__body">
          {CollectionsPage.length === 0
            ? new Array(12).fill(0).map((_, i) => (
              <div className="collection-column">
                <div className="collection__img">
                  <Skeleton width="100%" height="180px" borderRadius="16px" />
                </div>
                <div className="collection__info">
                  <Skeleton borderRadius="16px" />
                  <div className="collection__stats">
                    <div className="collection__stat">
                      <div className="collection__stat__label">
                        <Skeleton width="50px" height="18px" borderRadius="4px" />
                      </div>
                      <div className="collection__stat__data">
                        <Skeleton width="80px" height="18px" borderRadius="4px" />
                      </div>
                    </div>
                    <div className="collection__stat">
                      <div className="collection__stat__label">
                        <Skeleton width="50px" height="18px" borderRadius="4px" />
                      </div>
                      <div className="collection__stat__data">
                        <Skeleton width="80px" height="18px" borderRadius="4px" />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          ))
            : CollectionsPage.slice(0, CollectionAmount).map((NFT, index) => (
              <div className="collection-column">
                <Link to="/collection" key={index} className="collection">
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
              </div>
            ))}
        </div>
        {CollectionAmount < CollectionsPage.length && (
          <button className="collections-page__button"
            onClick={() => {
              setCollectionAmount(prev => prev + 6)
            }}>
            Load more</button>
        )}
      </div>
    </div>
  );
}

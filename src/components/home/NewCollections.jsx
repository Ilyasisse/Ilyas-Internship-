import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NewCollections() {



  const [newCollections, setnewCollections] = useState([])

  useEffect(() => {

    async function fetchData() {
      const info = await axios.get("https://remote-internship-api-production.up.railway.app/newCollections")
      const newData = info.data.data
      setnewCollections(newData)
    }

    fetchData()

  }, [])





  return (
    <section id="new-collections">
      <div className="container">
        <div className="row">
          <h2 className="new-collections__title">New Collections</h2>
          <div className="new-collections__body">
            {newCollections.map((NFT, index) => (
              <div className="collection-column"  key={index}>
                <Link to="/collection" className="collection">
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
                        <span className="collection__stat__data">{(Math.ceil(NFT.floor * 100) / 100).toFixed(2)} ETH</span>
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
        </div>
      </div>
    </section>
  );
}

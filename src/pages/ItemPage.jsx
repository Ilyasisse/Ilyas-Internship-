import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faShapes, faTag, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import RecommendedItems from "../components/item/RecommendedItems";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/ui/Skeleton";

export default function ItemPage() {
  const { id } = useParams();

  const [itemCollection, setItemCollection] = useState({});
  const [endTime, setEndTime] = useState(0);      
  const [timeLeft, setTimeLeft] = useState(0);    
  const [loading , setLoading] = useState(true)

  const pad2 = (n) => String(n).padStart(2, "0");

  
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const res = await axios.get(`https://remote-internship-api-production.up.railway.app/item/${id}`);
      const data = res.data.data || {};
      setItemCollection(data);

     
      const end = new Date(data.expiryDate).getTime(); 
      setEndTime(end);
      setTimeLeft(Math.max(0, end - Date.now()));
      setLoading(false)
    }
    fetchData();
  }, [id]);
  
  
  useEffect(() => {
    if (!endTime) return;
    const tick = () => {
      const remaining = endTime - Date.now();
      setTimeLeft(remaining > 0 ? remaining : 0);
    };
    tick(); 
    const idInt = setInterval(tick, 1000);
    return () => clearInterval(idInt);
  }, [endTime]);


  const totalSeconds = Math.floor(timeLeft / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  
  if (Object.keys(itemCollection).length === 0) {
    return (
      <section id="item-info">
        <div className="container">
          <div className="row item-page__row">
            <div className="item-page__left">
              <figure className="item-page__img__wrapper">
                <div className="item-page__img__details">
                  <div className="item-page__img__likes">
                    <div className="item-page__img__icon">
                      <Skeleton width="15px" height="10px" />
                    </div>
                  </div>
                </div>
                <div className="item-page__img">
                  <Skeleton width="100%" height="100%" borderRadius="12px" />
                </div>
              </figure>
            </div>
            <div className="item-page__right">
              <div className="item-page__collection light-blue">
                <Skeleton width="140px" height="16px" borderRadius="4px" />
              </div>
              <div className="item-page__name">
                <Skeleton width="280px" height={16} borderRadius={4} />
              </div>
              <div className="item-page__owner">
                <Skeleton width={140} height={16} borderRadius={4} />
              </div>
              <div className="item-page__details">
                <div className="item-page__detail"><div className="item-page__detail__text"><Skeleton width={84} height={16} borderRadius={4} /></div></div>
                <div className="item-page__detail"><div className="item-page__detail__text"><Skeleton width={84} height={16} borderRadius={4} /></div></div>
                <div className="item-page__detail"><div className="item-page__detail__text"><Skeleton width={84} height={16} borderRadius={4} /></div></div>
              </div>
              <div className="item-page__sale">
                <div className="item-page__sale__header"><Skeleton width={240} height={16} borderRadius={4} /></div>
                <div className="item-page__sale__body"><span className="item-page__sale__label"><Skeleton width={84} height={16} borderRadius={4} /></span></div>
                <div className="item-page__sale__price">
                  <span className="item-page__sale__price__eth"><Skeleton width={152} height={16} borderRadius={4} /></span>
                  <span className="item-page__sale__price__dollars"><Skeleton width={152} height={16} borderRadius={4} /></span>
                </div>
                <div className="item-page__sale__buttons"><Skeleton width="100%" height={48} borderRadius={12} /></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="item-info">
        <div className="container">
          <div className="row item-page__row">
            <div className="item-page__left">
              <figure className="item-page__img__wrapper">
                <div className="item-page__img__details">
                  <FontAwesomeIcon icon={faEthereum} className="item-page__img__icon" />
                  <div className="item-page__img__likes">
                    <FontAwesomeIcon icon={faHeart} className="item-page__img__icon" />
                    <span className="item-page__img__likes__text">{itemCollection.favorites}</span>
                  </div>
                </div>
                <img src={itemCollection.imageLink} alt="" className="item-page__img" />
              </figure>
            </div>

            <div className="item-page__right">
              <Link to={`/collection/${itemCollection.collectionId}`} className="item-page__collection light-blue">
                {itemCollection.collection}
              </Link>

              <h1 className="item-page__name">{itemCollection.title}</h1>

              <span className="item-page__owner">
                Owned by{" "}
                <Link to={`/user/${itemCollection.ownerId}`} className="light-blue item-page__owner__link">
                  {itemCollection.owner}
                </Link>
              </span>

              <div className="item-page__details">
                <div className="item-page__detail">
                  <FontAwesomeIcon icon={faEye} className="item-page__detail__icon" />
                  <span className="item-page__detail__text">{itemCollection.views} views</span>
                </div>
                <div className="item-page__detail">
                  <FontAwesomeIcon icon={faHeart} className="item-page__detail__icon" />
                  <span className="item-page__detail__text">{itemCollection.favorites} favorites</span>
                </div>
                <div className="item-page__detail">
                  <FontAwesomeIcon icon={faShapes} className="item-page__detail__icon" />
                  <span className="item-page__detail__text">PFPs</span>
                </div>
              </div>

              <div className="item-page__sale">
                <div className="item-page__sale__header">
                  {timeLeft > 0 && <div className="green-pulse"></div>}
                  <span>
                    {timeLeft > 0
                      ? `Sale ends in ${pad2(hours)}h ${pad2(minutes)}m ${pad2(seconds)}s`
                      : "Sale ended"}
                  </span>
                </div>

                <div className="item-page__sale__body">
                  <span className="item-page__sale__label">Current price</span>
                  <div className="item-page__sale__price">
                    <span className="item-page__sale__price__eth">{itemCollection.ethPrice} ETH</span>
                    <span className="item-page__sale__price__dollars">{itemCollection.usdPrice}</span>
                  </div>
                  <div className="item-page__sale__buttons">
                    <div className="item-page__sale__buy">
                      <button className="item-page__sale__buy__button disabled">Buy now</button>
                      <button className="item-page__sale__buy__icon disabled">
                        <FontAwesomeIcon icon={faShoppingBag} />
                      </button>
                    </div>
                    <button className="item-page__sale__offer disabled">
                      <FontAwesomeIcon icon={faTag} /> Make offer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RecommendedItems
        collectionId={itemCollection.collectionId}
        currentItemId={itemCollection?.id}
      />
    </>
  );
}

import React from 'react'
import Skeleton from "../ui/Skeleton"
export default function TreadingSkele() {
  return (
    <div className="trending-collection">
    <div className='trending-collection__img__wrapper'>
        <Skeleton width="75px" height="75px" borderRadius="25%"/>
    </div>
    <div className="trending-collection__name , trending-column__body">
        <Skeleton width="500px" height="50px"  />
    </div>
    
    </div>
  )
}

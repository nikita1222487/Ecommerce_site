import React from 'react'
import ReactStars from "react-rating-stars-component"
import profilePng from "../../images/profile.png"
function ReviewCard({review}) {
    const  review1={
        name:"Abhishek",
        comment:"This is working",
        rating:3
      }

  const options={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth<600?20:25,
    value:review1.rating,
    isHalf:true
  }

  return (
    <div className="reviewCard">
        <img src={profilePng} alt="User" />
        <p>{review1.name}</p>
        <ReactStars {...options}/>
        <span>{review1.comment}</span>
    </div>
  )
}

export default ReviewCard
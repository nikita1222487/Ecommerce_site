import React, { Fragment, useState } from 'react'
import "./Search.css"
import {useNavigate }from "react-router-dom"
// import browerHistory from"react-router-dom"

function Search({history}) {
    const navigate=useNavigate()
    const [keyword,setKeyword]=useState("");
    console.log(history)
    const searchSubmitHandler=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            // navigate(-1)
            navigate(`/products/${keyword}`,{replace:true})
        }
    else{
        // navigate(-1)
        navigate("/products",{replace:true})
    }}

  return (
    <Fragment>
        <form className='searchBox' onSubmit={searchSubmitHandler}>
            <input type="text"
            placeholder='Search a Product ...'
            onChange={(e)=>setKeyword(e.target.value)} />

            <input type="submit" value="Search" />
        </form>
    </Fragment>
  )
}

export default Search
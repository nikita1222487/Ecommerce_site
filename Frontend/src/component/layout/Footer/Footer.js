import React from 'react'
import "./Footer.css"
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/appstore.png"
function Footer() {
  return (
    <footer if ="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUT APP</h4>
        <p>Download App for android and IOS mobile phone</p>
        <img src={playStore} alt="playStore" />
        <img src={appStore} alt="AppStore" />
      </div>
      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>
        <p>Coptrights 2021 &copy; Abhishek Naula</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/whitewolf_0058T">Instagram</a>
        <a href="http://instagram.com/whitewolf_0058T">Youtube </a>
        <a href="http://instagram.com/whitewolf_0058T">Facebook</a>
      </div>
    </footer>
  )
}

export default Footer
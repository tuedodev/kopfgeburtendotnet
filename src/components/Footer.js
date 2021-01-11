import React from "react"
import { FOOTER_TEXT, SOCIAL_MEDIA_LINK_FB } from "../config/config"

const Footer = () => {
  return (
  <div className="footer-inner-container">
    <a href={SOCIAL_MEDIA_LINK_FB} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><div className="icon_facebook" style={{width:'48px', height:'48px'}}></div></a>
   <div style={{ textAlign: 'center', fontSize:'1.4rem' }}>{FOOTER_TEXT}</div>
  </div>
  )
}

export default Footer

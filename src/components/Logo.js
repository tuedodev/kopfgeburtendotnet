import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import { Link } from "gatsby"

const query = graphql`
{
  logo:allSanitySettings(limit: 1) {
    nodes {
      logo {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
          fixed (width:300){
            ...GatsbySanityImageFixed
          }
        }
      }
    }
  }
}
`
const Logo = ({linked=false}) => {
  const {logo} = useStaticQuery(query)
  const img = <Image className="logo-image" fluid={logo.nodes[0].logo.asset.fluid} placeholderStyle={{ visibility: "hidden" }} style={{width:'100%'}}/>
  const li = <Link to="/" className="navbar-brand kg-logo" style={{width:'100%'}}>{img}</Link>
  if (linked){
    return li;
  } else {
    return img;
  }/*
return (
    <Link to="/" className="navbar-brand kg-logo" style={{width:'100%'}}>
      <Image className="logo-image" fluid={logo.nodes[0].logo.asset.fluid} placeholderStyle={{ visibility: "hidden" }} style={{width:'100%'}}/>
    </Link>
  )*/
}

export default Logo

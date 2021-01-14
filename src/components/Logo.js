import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import AniLink from "gatsby-plugin-transition-link/AniLink"

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
  const li = <AniLink fade duration={0.4} to="/" className="navbar-brand kg-logo" style={{width:'100%'}}>{img}</AniLink>
  if (linked){
    return li;
  } else {
    return img;
  }
}

export default Logo

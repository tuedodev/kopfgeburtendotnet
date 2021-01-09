import React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Datestring from "../components/Datestring"
//import RichText from "../components/RichText"
import Image from "gatsby-image"
import CardHeaderBanner from "../components/CardHeaderBanner"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import getImageUrl  from '../utils/getImageUrl'

export const query = graphql`
  {
    aktuelles: allSanityAktuelles {
        nodes {
          _id
          title
          slug{
            current
          }
          intro
          user {
            _id
            email
            name
            nickname
            thumbnail {
              asset {
                fixed(width: 50, height:50) {
                    ...GatsbySanityImageFixed
                }
              }
            }
          }
          datum
          publishedAt
          featuredImage {
            image {
              asset {
                fixed: fixed(width: 800) {
                    ...GatsbySanityImageFixed
                }
                fluid {
                    ...GatsbySanityImageFluid
                }
                _id
              }
            }
            alt
            caption
            showCaption
          }
          raw_content: _rawContent(resolveReferences: {maxDepth: 10})
        }
    }
    metadata: allSanityStaticSite(filter: {staticSiteSlug: {current: {eq: "aktuelles"}}}, limit: 1) {
        nodes {
            metadata {
                description: metaDescription
                keywords: metaKeywords
                title: metaTitle
            }
            publishedAt: staticSitePublishedAt
        }
    }
}
`
const aktuelles = ({ data, location }) => {
    const aktuelles = data.aktuelles.nodes
    const image = getImageUrl(aktuelles[0].featuredImage.image.asset)
    const metaData = {...data.metadata.nodes[0].metadata, ...{publishedAt: data.metadata.nodes[0].publishedAt}, ...{image: image}}
        
    return (
        <Layout metaData={metaData} location={location}>
                <div className="mt-5 mb-4" style={{display:'grid', gap:'2rem', gridTemplateColumns:'repeat(auto-fit, minmax(400px, 1fr))'}}>
                    {aktuelles.map(aktuell=>{
                        return (<div className="card shadow" key={aktuell._id}>
                            <CardHeaderBanner title={aktuell.title} to={"/aktuelles/" + aktuell.slug.current} />
                            <div className="article-meta">
                                <div className="article-meta-user" key={aktuell.user._id}>
                                    {aktuell.user.thumbnail && <Image fixed={aktuell.user.thumbnail.asset.fixed} alt={aktuell.user.name}/>}
                                </div>
                                <div className="article-meta-date">
                                    <div className='kg-meta-inverse article-meta-date-inner'>
                                        <span>{aktuell.user.name}</span>
                                        <Datestring datestring={aktuell.datum}/>
                                    </div>
                                </div>
                            </div> 
                            <div className="card-body kg-card-body bg-white-l">
                                <div className="kg-card-body-container">
                                    <div className="featured-image">
                                        <Image className="featured-image-img" fluid={aktuell.featuredImage.image.asset.fluid} alt={aktuell.featuredImage.alt}/>
                                    </div>
                                    <p className="kg-card-body-container-text kg-meta-inverse">{aktuell.intro}</p>
                                </div>
                            </div>
                            <div className="kg-footer-btn-container">
                                <AniLink fade duration={0.4} to={"/aktuelles/" + aktuell.slug.current} className="btn btn-primary btn-md" type="button">
                                    Mehr Lesen
                                </AniLink>
                            </div>
                        </div>)
                    })}
                </div>
        </Layout>
    )
}

export default aktuelles

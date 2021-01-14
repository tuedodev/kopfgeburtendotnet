import React from 'react'
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Datestring from "../components/Datestring"
import Image from "gatsby-image"
import CardHeaderBanner from "../components/CardHeaderBanner"
import Pagination from "../components/Pagination"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import getImageUrl  from '../utils/getImageUrl'

export const query = graphql`
query getAllAktuelles($limit: Int!, $skip: Int!) {
    aktuelles_all: allSanityAktuelles(limit: $limit, skip: $skip) {
        nodes {
          _id
          featuredImage {
            image {
              asset {
                fixed500: fixed(width: 500) {
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
          slug {
            current
          }
          publishedAt
          title
          intro
          datum
          publishedAt
          user {
            email
            name
            nickname
            thumbnail {
              asset {
                fixed(width: 50, height: 50) {
                    ...GatsbySanityImageFixed
                }
              }
            }
          }
          furtherFotos {
            image {
              asset {
                fixed(width: 120) {
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
          _key
          raw_content: _rawContent(resolveReferences: {maxDepth: 10})
          metadata {
            description: metaDescription
            keywords: metaKeywords
            title: metaTitle
          }
        }
      }
    getDefaultImage: allSanitySettings (limit: 1) {
      nodes {
        defaultImage {
          image {
            asset {
              fixed(width: 1200) {
                ...GatsbySanityImageFixed
              }
              _id
            }
          }
          alt
          caption
          showCaption
        }
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

const aktuellesListTemplate = ({ data, location, pageContext}) => {
    const currentPage = pageContext.currentPage
    const numPages = pageContext.numPages
    const aktuelles = data.aktuelles_all.nodes
    const image = getImageUrl(aktuelles[0].featuredImage.image.asset)
    const site_metadata = data.metadata.nodes[0].metadata
    const metadata = site_metadata && Object.keys(site_metadata).length > 0 ? {...site_metadata, ...{publishedAt: data.metadata.nodes[0].publishedAt}, ...{image: image},  ...{title:`${site_metadata.title} - Seite ${currentPage}`}}:{}
    
    return (
        <Layout metaData={metadata} location={location}>
                <div className="aktuelles-list-container mt-5 mb-4">
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
                <Pagination path="aktuelles" currentPage={currentPage} numPages={numPages} />
        </Layout>
    )
}

export default aktuellesListTemplate
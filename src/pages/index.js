import React from "react"
import { graphql } from "gatsby"
import Logo from "../components/Logo"
import Modal_Carousel from "../components/Modal_Carousel"
import CardHeaderBanner from "../components/CardHeaderBanner"
import Image from "gatsby-image"
import Layout from "../components/layout"
import ImageGallery from "../components/ImageGallery"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import getUrl from "../utils/getUrl"
import {GATSBY_SITEMETADATA_TITLE, GATSBY_SITEMETADATA_SUBTITLE} from "../config/config"

export const query = graphql`
  {
    teaserQuery: allSanitySettings {
      nodes {
        teaser {
          _key
          referenceToPandA {
            ... on SanityAktuelles {
              title
              intro
              featuredImage{
                image {
                  asset {
                    fluid{
                      ...GatsbySanityImageFluid
                    }
                  }
                }
              }
              slug {
                current
              }
              _type
            }
            ... on SanityProject {
              id
              title
              intro:short_description
              slug {
                current
              }
              paintings {
                image {
                  asset {
                    fixed(width: 165) {
                      ...GatsbySanityImageFixed
                    }
                    fluid{
                      ...GatsbySanityImageFluid
                    }
                    _id
                  }
                }
                alt
                caption
                showCaption
                _key
              }
              _type
            }
          }
        }
      }
    }
    site: allSanityStaticSite(filter: {staticSiteSlug: {current: {eq: "index"}}}, limit: 1) {
      nodes {
        publishedAt: staticSitePublishedAt
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
        }
      }
    }
}
`

export default function Home({data, location}) {
  const teaser = data.teaserQuery.nodes[0].teaser
  const site = data.site.nodes[0] || {}
  const image = data.getDefaultImage.nodes[0].defaultImage.image.asset || null;
  const metaData = site && Object.keys(site).length > 0 ? {...site.metadata, ...{publishedAt: site.publishedAt}, ...{image: image}}:{}
  const ArticleIntro = ({intro}) => {
    return (
      <div className="kg-card-text-container mt-3">
        <p className="mb-0 p-3 kg-meta-inverse">{intro}</p>
      </div>
      )
  }

  return (
    <Layout metaData={metaData} location={location}>
      <div className="kg-hero">
        <div className="kg-hero-logo-container">
          <div className="logo-wrapper"><Logo linked={false}/></div>
        </div>
        <div className="kg-hero-titles"><h1>{GATSBY_SITEMETADATA_TITLE}</h1><h2>{GATSBY_SITEMETADATA_SUBTITLE}</h2></div>
      </div>
      <div className="kg-teaser-container mb-4">
      {teaser && 
        teaser.map((tease, index)=>{
          let item = tease.referenceToPandA;
          let modalCarouselID = `modal-carousel-${index}`;
          return (
            <div className="card shadow kg-card mt-5" key={ tease._key }>
              <CardHeaderBanner title={item.title} to={getUrl(item.slug.current, item._type)} type={item._type} linked/>
              <div className="card-body p-0">
                {item._type==='aktuelles'? (
                  <div className="kg-card-body-container mt-3">
                     <div className="kg-card-img-container">
                        <div className="kg-img-wrapper"><Image fluid={item.featuredImage.image.asset.fluid} alt={item.featuredImage.alt}/></div>
                    </div>
                    <ArticleIntro intro={item.intro}/>
                  </div>
                      
                  ):(
                    <>
                    <div className="kg-card-body-container mt-3">
                      <ImageGallery className="kg-img-gallery mt-3 gap-3" source={item.paintings} modalCarouselID={modalCarouselID} width="170px" vcentered/>
                      <Modal_Carousel bilder={item.paintings} title={item.title} id={modalCarouselID} selected={true}/>
                      <ArticleIntro intro={item.intro}/>
                    </div>
                    
                    
                    </>
                  )}
                
              </div>
              <div className="kg-card-footer d-flex justify-content-center">
                  <AniLink fade duration={0.4} to={getUrl(item.slug.current, item._type)} className="btn btn-primary btn-lg my-3" type="button">
                   {item._type==='aktuelles'?'Mehr lesen':'Mehr schauen'}
                  </AniLink>
              </div>
            </div>
          )
        })
      }
      </div>
    </Layout>
  )
}

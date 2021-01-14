import React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/layout"
import StaticSite from "../components/StaticSite"
import CardHeaderBanner from "../components/CardHeaderBanner"

export const query = graphql`
query getSingleSiteImpressum {
    site: allSanityStaticSite(filter:{staticSiteSlug: {current: {eq: "impressum"}}}, limit: 1) {
      nodes {
        title:staticSiteTitle
        intro:staticSiteIntro
        publishedAt:staticSitePublishedAt
        content: staticSiteContent {
            children {
              _key
              _type
              text
              marks
            }
            list
            style
            _key
            _rawChildren(resolveReferences: {maxDepth: 10})
            _type
        }
        content_raw: _rawStaticSiteContent(resolveReferences: {maxDepth: 10})
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

const impressum = ({ data, location }) => {
  const site = data.site.nodes[0] || {}
  const image = data.getDefaultImage.nodes[0].defaultImage.image.asset || null;
  const metaData = site && Object.keys(site).length > 0 ? {...site.metadata, ...{publishedAt: site.publishedAt}, ...{image: image}}:{}

  return (
    <Layout metaData={metaData} location={location}>
      <div className="card shadow kg-card mt-5 mb-4">
        <CardHeaderBanner title={site.title} subtitle={site.intro} type='impressum' />
      </div>
      {site && (
        <div className="card shadow mb-4" style={{padding:'1rem'}}>
          <StaticSite site={site}/>
        </div>)}
    </Layout>
  )
}

export default impressum

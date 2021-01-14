import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import CardHeaderBanner from "../components/CardHeaderBanner"
import ContactForm from "../components/ContactForm"

export const query = graphql`
  {
    site: allSanityStaticSite(filter:{staticSiteSlug: {current: {eq: "kontakt"}}}, limit: 1) {
      nodes {
        title:staticSiteTitle
        intro:staticSiteIntro
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

const kontakt = ({ data, location }) => {
  const site = data.site.nodes[0] || {}
  const image = data.getDefaultImage.nodes[0].defaultImage.image.asset || null;
  const metaData = site && Object.keys(site).length > 0 ? {...site.metadata, ...{publishedAt: site.publishedAt}, ...{image: image}}:{}

  return (
    <Layout metaData={metaData} location={location}>
      <div className="card shadow kg-card mt-5 mb-4">
        <CardHeaderBanner title={site.title} subtitle={site.intro} type='kontakt' />
      </div>
      <ContactForm/>
    </Layout>
  )
}

export default kontakt

import React from 'react'
import Layout from "../components/layout"
import { graphql } from "gatsby"
import CardHeaderBanner from "../components/CardHeaderBanner"
import Pagination from "../components/Pagination"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import getImageUrl  from '../utils/getImageUrl'
import ImageGallery from "../components/ImageGallery"

export const query = graphql`
query getAllArbeiten($limit: Int!, $skip: Int!) {
    projects: allSanityProject(limit: $limit, skip: $skip) {
        nodes {
          id
          short_description
          title
          slug{
            current
          }
          paintings {
            image {
              asset {
                fixed: fixed(width: 165) {
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
        }
      }
      site: allSanityStaticSite(filter:{staticSiteSlug: {current: {eq: "arbeiten"}}}, limit: 1) {
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
}
`

const arbeitenListTemplate = ({ data, location, pageContext }) => {
    const currentPage = pageContext.currentPage
    const numPages = pageContext.numPages
    const projects = data.projects.nodes
    const site = data.site.nodes[0] || {}
    const image = getImageUrl(projects[0].paintings[0].image.asset)
    const metaData = site && Object.keys(site).length > 0 ? {...site.metadata, ...{publishedAt: site.publishedAt, ...{image:image}, ...{title:`${site.metadata.title} - Seite ${currentPage}`}}}:{}
    
    return (
        <Layout metaData={metaData} location={location}>
        <div className="card shadow kg-card mt-5 mb-4">
          <CardHeaderBanner title={site.title} subtitle={site.intro} type='arbeiten' />
        </div>
        <div>
          {projects.map((project, index) => {
            return (
              <div className="card shadow kg-card mb-3" key={project.id}>
                <CardHeaderBanner title={project.title} to={project.slug.current} subtitle={project.short_description} />
                <div className="kg-card-body-container my-3" key={project.id}>
                    <ImageGallery className="kg-img-gallery mt-3 gap-3" source={project.paintings} width="190px" id={index} vcentered/>
                </div>
                <div className="kg-card-footer d-flex justify-content-center">
                  <AniLink fade duration={0.4} to={project.slug.current} className="btn btn-primary btn-lg my-3" type="button">Anschauen
                    </AniLink>
                </div>
              </div>
            )
          })}
        </div>
        <Pagination path="arbeiten" currentPage={currentPage} numPages={numPages} />
    </Layout>
    )
}

export default arbeitenListTemplate
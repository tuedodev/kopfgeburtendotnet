import React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/layout"
//import CardHeaderBanner from "../components/CardHeaderBanner"
import Modal_Carousel from "../components/Modal_Carousel"
import CardHeaderBanner from "../components/CardHeaderBanner"
import ImageGallery from "../components/ImageGallery"
import RichText from '../components/RichText'

export const query = graphql`
query getSingleProject($slug: String, $width: Int) {
    project: sanityProject(slug: {current: {eq: $slug}}) {
      short_description
      title
      paintings {
        image {
          asset {
            fixed(width: $width) {
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
      slug {
        current
      }
      metadata {
        description: metaDescription
        keywords: metaKeywords
        title: metaTitle
      }
      publishedAt
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
  }
`

const arbeitenTemplate = ({data, location}) => {
    const {project} = data
    const defaultImage = data.getDefaultImage.nodes[0].defaultImage.image.asset || null;
    const image = project.paintings[0].image.asset || defaultImage;
    const metaData = Object.keys(project.metadata).length > 0 ? {...project.metadata, ...{publishedAt: project.publishedAt}, ...{image: image}}:{}
    let modalCarouselID = `modal-carousel-1`;

    return (
        <Layout metaData={metaData} location={location}>
          <article className="card kg-article single-project shadow my-5">
            <CardHeaderBanner title={project.title} subtitle={project.short_description} type='projekt' h1 />
            {project.raw_content && (<section className="main-content">
                <RichText raw_content={project.raw_content}/> 
            </section>)}
            <ImageGallery className="gallery" source={project.paintings} modalCarouselID={modalCarouselID} vcentered/>
          </article>
          <Modal_Carousel id={modalCarouselID} bilder={project.paintings} title={project.title} selected={true}/>         
        </Layout>
    )
}

export default arbeitenTemplate

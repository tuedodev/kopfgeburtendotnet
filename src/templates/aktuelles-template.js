import React from 'react'
import Layout from "../components/layout"
import RichText from "../components/RichText"
import Datestring from "../components/Datestring"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import ImageGallery from "../components/ImageGallery"

export const query = graphql`
query getSingleAktuelles($slug: String) {
    aktuelles: sanityAktuelles(slug: {current: {eq: $slug}}) {
        _id
        title
        slug{
          current
        }
        intro
        user {
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
        furtherFotos {
          image {
            asset {
              fixed(width: 120){
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

const aktuellesTemplate = ({data, location}) => {
    const aktuell = data.aktuelles;
    const defaultImage = data.getDefaultImage.nodes[0].defaultImage.image.asset || null;
    const image = aktuell.featuredImage.image.asset || defaultImage
    const metaData = Object.keys(aktuell.metadata).length > 0 ? {...aktuell.metadata, ...{publishedAt: aktuell.publishedAt}, ...{image: image}}:{}
    
    return (
        <>
        <Layout metaData={metaData} location={location}>
            <article className="kg-article">
                <header className="kg-article-header">
                    <div className="date"><Datestring datestring={aktuell.datum}/></div>
                    <div className="row justify-content-center">
                      <div className="col-12 col-md-10">
                        <h1>{aktuell.title}</h1>
                      </div>
                    </div>
                </header>
                <div style={{display:'grid', gridTemplateColumns:'10px 40px auto', gridTemplateRows:'50px'}}>
                    <div style={{width:'50px', height:'50px', gridArea: '1 / 2 / 2 / 3'}}>
                        {aktuell.user.thumbnail && <Image fixed={aktuell.user.thumbnail.asset.fixed} alt={aktuell.user.name} style={{borderRadius:'50%'}} />}
                    </div>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center', gridArea: '1 / 1 / 2 / 4'}}>
                        <div className='kg-inverse' style={{display:'flex', justifyContent:'space-between', fontSize:'0.9rem', width:'100%', padding:'0.2rem 0.6rem', borderRadius:'10px'}}>
                            <span style={{paddingLeft:'60px'}}>{aktuell.user.name}</span>
                            <span>veröffentlicht am <Datestring datestring={aktuell.publishedAt}/></span>
                        </div>
                    </div>
                </div> 
                <section className="kg-article-intro">
                  <div className="row justify-content-center">
                    <div className="col-12 col-md-10">
                      <p>{aktuell.intro}</p>
                    </div>
                  </div>
                </section>
                <section className="featured-image">
                    <div className="row justify-content-center">
                      <div className="col-12 col-md-10">
                        <Image fluid={aktuell.featuredImage.image.asset.fluid} alt={aktuell.featuredImage.alt} />
                      </div>
                    </div>
                </section>
                <section className="main-content">
                  <RichText raw_content={aktuell.raw_content}/> 
                </section>
                {aktuell.furtherFotos.length > 0 &&
                    <section className="further-fotos">
                      <h3 style={{width:'100%', borderBottom:'2px solid gray'}}>Weitere Fotos:</h3>
                      <ImageGallery className="further-fotos-container my-3 gap-3" source={aktuell.furtherFotos} width="150px" vcentered />
                    </section>
                }
            </article>
        </Layout>
        </>
    )
}

export default aktuellesTemplate
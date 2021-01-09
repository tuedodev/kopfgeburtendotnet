import React from 'react'
import RichText from './RichText'
//import BlockContent from '@sanity/block-content-to-react'
//import urlBuilder from '@sanity/image-url'
//import { graphql, useStaticQuery } from "gatsby"
//import {useStaticSiteData} from '../hooks/use-static-site-data'
/*
const getContent = graphql`
query getSingleSite($slug: String) {
    site: allSanityStaticSite(filter:{staticSiteSlug: {current: {eq: $slug}}}) {
      nodes {
        title:staticSiteTitle
        intro:staticSiteIntro
        published:staticSitepublishedAt
        content:staticSiteContent {
          children {
            marks
            text
            _key
          }
        }
      }
    }
  }
`
const urlFor = source => urlBuilder({projectId: '3be3gsdk', dataset:'production'}).image(source);

const serializer = {
    types: {
        figure: props => (
        <figure className={props.node.figureCssClass}>
            <img src={urlFor(props.node.image.asset).url()} alt={props.node.alt} />
            {props.node.showCaption && <figcaption>{props.node.caption}</figcaption>}
        </figure>
        )
    }
}*/

const StaticSite = ({site}) => {
    
    return (
        <>
              <RichText raw_content={site.content_raw}/>
        </>
    )
}

export default StaticSite

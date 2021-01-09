import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import urlBuilder from '@sanity/image-url'

const urlFor = source => urlBuilder({projectId: process.env.GATSBY_SANITY_PROJECTID, dataset: process.env.GATSBY_SANITY_DATASET}).image(source);

const serializer = {
    types: {
        figure: props => (
        <figure>
            <img src={urlFor(props.node.image.asset).url()} alt={props.node.alt} />
            {props.node.showCaption && <figcaption>{props.node.caption}</figcaption>}
        </figure>
        ),
        figurefloat: function(props){
           
            const Figure = () => (
                <figure className={props.node.cssClass}>
                    <img src={urlFor(props.node.figure.image.asset).url()} style={{width:'100%'}} alt={props.node.figure.alt} />
                    {props.node.figure.showCaption && <figcaption>{props.node.figure.caption}</figcaption>}
                </figure>
            )
            if (props.node.wrapperClass){
                let margin = props.node.margin || 0
                let direction = props.node.direction
                if (direction==="left" || direction==="right"){
                    let marginObj = direction==="left"?{marginRight:margin}:{marginLeft:margin}
                    
                    return (
                        <div className={props.node.wrapperClass} style={{width:props.node.width, float: props.node.direction, marginBottom:margin, ...marginObj}}>
                            <Figure />
                        </div>
                    )
                } else {
                    let val = `0 auto ${margin} auto`
                    let marginObj = {margin:val}
                    return (
                        <div className={props.node.wrapperClass} style={{width:props.node.width, display: 'block', ...marginObj}}>
                                <Figure />
                        </div>)
                }
            } else {
                return <Figure/>
            }
        }
    },
    marks: {
        link: ({children, mark}) => mark.targetBlank?(
            <a href={mark.href} target="_blank" rel="noopener noreferrer">{children}</a>
        ):(
            <a href={mark.href}>{children}</a>
        )   
        
    },
}

const RichText = ({raw_content}) => {
    return <BlockContent blocks={raw_content} serializers={serializer}/>
}

export default RichText

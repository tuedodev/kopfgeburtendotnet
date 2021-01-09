import React from 'react'
import AniLink from "gatsby-plugin-transition-link/AniLink"
import getUrl from "../utils/getUrl"

const CardHeaderBanner = (props) => {
    let { type, title, subtitle, linked, to, h1 } = props
    if (type==='project'){
        type='arbeiten';
    }
    const Banner = linked?  (props) =>  (<AniLink fade duration={0.4} className="kg-banner kg-inverse"  to={getUrl('', props.type)} style={{textDecoration:'none'}}>
                                            <span>{props.type}</span>
                                        </AniLink>):
                            (props) =>  (<div className="kg-banner kg-inverse"><span style={{cursor:'default'}}>{props.type}</span></div>)
    let H = h1?(props)=><h1 className="mb-0">{ props.title }</h1>:(props)=><h2 className="mb-0">{ props.title }</h2>
    let Header = null;
    if (to){
        Header = function(props){
            return (<AniLink fade duration={0.4} to={to} style={{textDecoration:'none'}}>
                <H title={title} />
            </AniLink>)
        }
     } else {
        Header = H;
    }
                        
    return (
        <div className="kg-card-header">
            {type && <Banner type={type}/>}
            <div className="kg-header-container">
                <div className="kg-header-inner-container">
                    <Header title={title}/>
                    {subtitle && <p className="subtitle">{subtitle}</p>}
                </div>
            </div>
        </div>
    )
}

export default CardHeaderBanner

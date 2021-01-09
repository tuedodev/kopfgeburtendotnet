import React, { useEffect} from 'react'
import Image from "gatsby-image"

const ImageGallery = (props) => {

        const toggleBtn = (elem) => {
            let btn = elem.parentElement.querySelector('button.collapse-btn')
            btn.textContent = elem.classList.contains('show')?toggleBtnText[0]:toggleBtnText[1]
        }
        useEffect(() => {
            let colls = document.querySelectorAll('.collapse');
            colls = Array.from(colls);
            colls.forEach(function(coll) {
                coll.addEventListener('show.bs.collapse', function(e){
                    toggleBtn(e.target)
                })
                coll.addEventListener('hide.bs.collapse', function(e){
                    toggleBtn(e.target)
                })
            })
        });
        const {source, width, id=1, modalCarouselID, className, vcentered} = props
        const toggleBtnText = ['\u2193 Aufklappen', '\u2191 Zuklappen']
        const styleObj = { gridTemplateColumns: `repeat(auto-fit, ${width})`}
        const MAX_AMOUNT_OF_ITEMS = 5;
        const vcenter = vcentered?{height:'100%', alignItems:'center'}:{} 
        const ImgGallery = (props) =>   (<div className="kg-img-wrapper modalitems" style={vcenter}>
                                            <div style={{width:'100%'}} key={props.item.image.asset._id}>
                                                <figure>
                                                    <Image fluid={props.item.image.asset.fluid} alt={props.item.alt} />
                                                    {props.item.showCaption && (
                                                        <figcaption className="kg-img-caption">{props.item.caption}</figcaption>
                                                    )}
                                                </figure>
                                            </div>
                                        </div>)
        const ModalWrapper = (props) => (<a href={'#'+props.modalCarouselID} style={{textDecoration:'none'}} data-bs-target={"#"+props.modalCarouselID} data-bs-toggle="modal" key={props.item._key} data-imgindex={props.index}>
                                            <ImgGallery item={props.item}/>
                                        </a>)
        const getItemWrapper = function(props){
            if (props.modalCarouselID){
                return <ModalWrapper modalCarouselID={props.modalCarouselID} item={props.item} index={props.index} key={props.index} />
            } else {
                return <ImgGallery item={props.item} key={props.index} />
            }
        }
        
        //let arr = [...source].slice(0, MAX_AMOUNT_OF_ITEMS);
        const Container = function(props){
            let cont1 = [...props.source].slice(0, MAX_AMOUNT_OF_ITEMS);
            let cont2 = [...props.source].slice(MAX_AMOUNT_OF_ITEMS);
            let modalCarouselID = props.modalCarouselID;
            let containerCollapseID = `collapseID-${props.id}`;
            return (
                <div>
                    <div className={className + " container1"} style={{display:'grid', ...styleObj}}>
                        {
                            cont1.map((item, index)=>{
                                return getItemWrapper({item, index, modalCarouselID})
                            })
                        }
                    </div>
                    {cont2.length > 0 && (
                        <>
                            <div style={{display:'flex', width:'100%', justifyContent:'center'}}>
                                <button className="btn btn-primary collapse-btn" data-bs-toggle="collapse" data-bs-target={"#"+containerCollapseID} aria-expanded="false" aria-controls={containerCollapseID}>
                                    {toggleBtnText[0]}
                                </button>
                            </div>
                            <div className="collapse" id={containerCollapseID}>
                                <div className={className + " container2"} style={{display:'grid', ...styleObj}}>
                                    {
                                        cont2.map((item, counter)=>{
                                            let index = counter + MAX_AMOUNT_OF_ITEMS
                                            return getItemWrapper({item, index, modalCarouselID})
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )
            
        }

        return (
            <>
                <Container source={source} modalCarouselID={modalCarouselID} id={id}/>
            </>
           
        )
}

export default ImageGallery

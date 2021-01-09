import React, {useEffect} from 'react'
import Carousel from "./Carousel.js"

const Modal_Carousel = ({title, bilder, id="modal_carousel", selected=false}) => {

    useEffect(() => {
        let modals = document.querySelectorAll('.modal.selected');
        let modalsArray = Array.from(modals);
        modalsArray.forEach(function(modal) {
            modal.addEventListener('show.bs.modal', function(e){
                let triggerElement = e.relatedTarget;
                if (triggerElement){
                    let index = triggerElement.getAttribute('data-imgindex');
                    let carInner = modal.querySelector('.carousel-inner');
                    let citems = carInner.querySelectorAll('.carousel-item');
                    let citemsArray = Array.from(citems);
                    citemsArray.filter(item => item.classList.contains('active')).forEach(item=>{
                        item.classList.remove('active');
                    });
                    if (!citemsArray[index].classList.contains('active')){
                        citemsArray[index].classList.add('active');
                    }
                }
            })
        })
    });
    
    return (
        <div className={selected?'modal fade selected':'modal fade'} id={id} tabIndex="-1">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="kg-header-btn-container" style={{display:'flex', padding:'1rem 1rem 0 0', justifyContent:'flex-end'}}>
                        <button type="button" className="btn-close btn-lg" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Carousel title={title} bilder={bilder} id={'carousel-'+id}/>
                    </div>
                    <div className="kg-footer-btn-container">
                        <button type="button" className="btn btn-secondary btn-lg" data-bs-dismiss="modal">Schließen</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal_Carousel

import React from "react"
import Image from "gatsby-image"

const Carousel = ({ title, bilder, id="kg-carousel" }) => {
  //const bilder_array = bilder.bilder
  return (
    <>
      
      {title && <h2>{title}</h2>}
      <div
        id={id}
        className="carousel slide carousel-dark"
        data-bs-ride="carousel"
      >
        <div
          className="carousel-inner"
          style={{ display: "flex", height: "800px", alignItems: "center" }}
        >
          {bilder.map(function (painting, index) {
            let cn = index === 0 ? "carousel-item active" : "carousel-item"
            return (
              <div className={cn} key={id + painting.image.asset._id}>
                <Image fluid={painting.image.asset.fluid} />
                {painting.showCaption && (
                  <div className="carousel-caption d-none d-md-block kg-carousel-caption">
                    <p><span className="opal-glass">{painting.caption}</span></p>
                  </div>
                )}
                
              </div>
            )
          })}
        </div>
        <a
          className="carousel-control-prev"
          href={"#"+id}
          role="button"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href={"#"+id}
          role="button"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>
    </>
  )
}

export default Carousel

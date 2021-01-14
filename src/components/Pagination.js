import React from 'react'
import AniLink from "gatsby-plugin-transition-link/AniLink"

const Pagination = ({currentPage, numPages, path }) => {

    if (numPages < 2){
        return null
    } else {
        return (
            <div className="kg-pagination">
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        {currentPage !== 1 && <li className="page-item" key="pagination-key-previous">
                            <AniLink className="page-link" aria-label="Previous" fade duration={0.4} to={"/" + path + "/" + (currentPage === 2 ? "":(currentPage-1))}>
                                <span aria-hidden="true">&laquo;</span>
                            </AniLink>
                        </li>}
                        {Array.from({ length: numPages }, (_, i) => (
                            <li className={(i + 1) === currentPage?"page-item active":"page-item"} key={`pagination-key-${i + 1}`}>
                                <AniLink className="page-link" fade duration={0.4} to={"/" + path + "/" + (i === 0 ? "" : i + 1)}>
                                {i + 1}
                                </AniLink>
                            </li>
                        ))}
                        {currentPage !== numPages && <li className="page-item" key="pagination-key-next">
                            <AniLink className="page-link" aria-label="Next" fade duration={0.4} to={"/" + path + "/" + (currentPage+1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </AniLink>
                        </li>}
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Pagination

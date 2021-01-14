import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"

export default function error() {
  return (
    <div>
      <h2>This is our custom error page.</h2>
      <AniLink fade duration={0.4} to="/">Zur Startseite</AniLink>
    </div>
  )
}

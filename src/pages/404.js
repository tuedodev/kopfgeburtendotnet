import React from "react"
import { Link } from "gatsby"

export default function error() {
  return (
    <div>
      <h2>This is our custom error page.</h2>
      <Link to="/">Zur Startseite</Link>
    </div>
  )
}

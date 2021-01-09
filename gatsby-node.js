const path = require('path')

exports.createPages = async ({graphql, actions}) => {
    const { createPage } = actions
    const result = await graphql(`
    query getSlugs {
        arbeiten:allSanityProject {
          nodes {
            slug {
              current
            }
            id
          }
        }
        aktuelles: allSanityAktuelles {
          nodes {
            slug {
              current
            }
            id
          }
        }
      }
    `)

    const {arbeiten, aktuelles} = result.data
    arbeiten.nodes.forEach(arbeit=>{
        console.log("CREATING PAGE: ", `/arbeiten/${arbeit.slug.current}`)
        createPage({
            path: `/arbeiten/${arbeit.slug.current}`,
            component:path.resolve(`src/templates/arbeiten-template.js`),
            context:{slug: arbeit.slug.current, id: arbeit.id, width: 1140},
        })
    })
    aktuelles.nodes.forEach(aktuell=>{
      console.log("CREATING PAGE: ", `/aktuelles/${aktuell.slug.current}`)
      createPage({
          path: `/aktuelles/${aktuell.slug.current}`,
          component:path.resolve(`src/templates/aktuelles-template.js`),
          context:{slug: aktuell.slug.current, id: aktuell.id},
      })
  })
}

// Solves the webpack problem with document. inside bootstrap javascript file:
// https://www.gatsbyjs.com/docs/debugging-html-builds/
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bootstrap/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
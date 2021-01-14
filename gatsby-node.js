const path = require("path")
const DEFAULT_NUMBER_OF_ITEMS_PER_PAGE = 6

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
        pagination: allSanitySettings(limit: 1) {
          nodes {
            aktuellesIsPaginated
            aktuellesItemsPerPage
            projectsIsPaginated
            projectsItemsPerPage
          }
        }
      }
    `)

    const {arbeiten, aktuelles, pagination} = result.data
    
    arbeiten.nodes.forEach(arbeit=>{
        createPage({
            path: `/arbeiten/${arbeit.slug.current}`,
            component:path.resolve(`src/templates/arbeiten-template.js`),
            context:{slug: arbeit.slug.current, id: arbeit.id, width: 1140},
        })
    })
    
    aktuelles.nodes.forEach(aktuell=>{
      createPage({
          path: `/aktuelles/${aktuell.slug.current}`,
          component:path.resolve(`src/templates/aktuelles-template.js`),
          context:{slug: aktuell.slug.current, id: aktuell.id},
      })
    })
    
    // Create List Pages Generic Function
    const createListPages = ({ basepath, itemsPerPage, numPages}) => {
      Array.from({length: numPages}).forEach((_, index) => {
        createPage({
          path: index === 0 ? `/${basepath}` : `/${basepath}/${index+1}`,
          component: path.resolve(`./src/templates/${basepath}-list-template.js`),
          context: {
            limit: itemsPerPage,
            skip: index * itemsPerPage,
            numPages,
            currentPage: index + 1,
          }
        })
      })
    }
    // Aktuelles: Create List Page (with Pagination)
    let aktuellesItemsPerPage = pagination.nodes[0].aktuellesItemsPerPage || DEFAULT_NUMBER_OF_ITEMS_PER_PAGE;
    if (!pagination.nodes[0].aktuellesIsPaginated){
      aktuellesItemsPerPage = 2000;
    }
    createListPages({
      basepath: 'aktuelles',
      itemsPerPage: aktuellesItemsPerPage,
      numPages: Math.ceil(aktuelles.nodes.length / aktuellesItemsPerPage),
    })
    // Projects; Create List Page (with Pagination)
    let projectsItemsPerPage = pagination.nodes[0].projectsItemsPerPage || DEFAULT_NUMBER_OF_ITEMS_PER_PAGE;
    if (!pagination.nodes[0].projectsIsPaginated){
      projectsItemsPerPage = 2000;
    }
    createListPages({
      basepath: 'arbeiten',
      itemsPerPage: projectsItemsPerPage,
      numPages: Math.ceil(arbeiten.nodes.length / projectsItemsPerPage),
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
import urlBuilder from '@sanity/image-url'

const getImageUrl = (source) => {
    return urlBuilder({projectId: process.env.GATSBY_SANITY_PROJECTID, dataset: process.env.GATSBY_SANITY_DATASET}).image(source).url()
}

export default getImageUrl 
const getFirstImageFromRichTextDataOrNull = (rawData) => {
    let firstPicture = rawData.find(raw => raw._type==='figurefloat')
    return firstPicture? firstPicture.figure.image.asset:null
}

export default getFirstImageFromRichTextDataOrNull

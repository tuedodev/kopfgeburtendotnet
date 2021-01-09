const getUrl = (slug, type) => {
    let s = ``;
    switch(type){
        case 'project':
        s = `/arbeiten/${slug}`;
        break;
        case 'arbeiten':
        s = `/arbeiten/${slug}`;
        break;
        case 'aktuelles':
        s = `/aktuelles/${slug}`;
        break;
        default:
        s = '';
        }
    return s;
}

export default getUrl;
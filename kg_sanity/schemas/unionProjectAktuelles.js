export default {
    name: 'unionProjectAktuelles',
    title: 'Projekte und Aktuelles gemischt',
    type: 'object',
    fields: [
        {
            name: 'referenceToPandA',
            title: 'Projekte und Aktuelles gemischt',
            type: 'reference',
            weak: true,
            to: [{type: 'project'}, {type: 'aktuelles'}],
            description: 'Projekte und Aktuelles gemischt'
        }
    ]
    
}
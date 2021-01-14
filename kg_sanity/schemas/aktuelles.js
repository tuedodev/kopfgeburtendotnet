export default {
    name: 'aktuelles',
    title: 'Aktuelles',
    type: 'document',
    initialValue: () => ({
        publishedAt: (new Date).toISOString(),
    }),
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Titel',
            validation: Rule => Rule.required().error('Titel ist Pflichtfeld'),
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 200, // will be ignored if slugify is set
              slugify: input =>
                input.toLowerCase().replace(/\s+/g, '-').replace(/\u00e4/g, "ae").replace(/\u00f6/g, "oe").replace(/\u00fc/g, "ue").replace(/\u00df/g, "ss").replace(/[^a-zA-Z0-9\-]|\s+/g, "").slice(0, 200),
            },
            validation: Rule => Rule.required().error('Slug ist Pflichtfeld'),
        },
        {
            name: 'user',
            title: 'User',
            type: 'reference',
            to: [{type:'user'}]
        },
        {
            name: 'datum',
            title: 'Datum der Varanstaltung',
            type: 'date',
            validation: Rule => Rule.required().error('Datum der Veranstaltung ist Pflichtfeld'),
        },
        {
            name: 'intro',
            title: 'Intro',
            type: 'text',
            validation: Rule => Rule.required().error('Intro / Einleitungstext ist Pflichtfeld'),
        },
        {
            name: 'content',
            title: 'Content',
            type: 'blockContent',
            validation: Rule => Rule.required().error('Content ist Pflichtfeld'),
        },
        {
            name: 'featuredImage',
            title: 'Hauptfoto',
            type: 'figure'
        },
        {
            name: 'furtherFotos',
            title: 'Weitere Fotos',
            type: 'array',
            of: [{ type: 'figure' }],
        },
        {
            name: 'metadata',
            type: 'metadata',
            title: 'Metadata für Header (SEO)',
            description: 'Ausfüllen: Hilft, bessere Platzierungen bei Google & Co. zu erzielen.'
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            validation: Rule => Rule.required().error('Veröffentlichungsdatum ist Pflichtfeld'),
        },
    ]
}
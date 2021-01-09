export default {
    name: 'staticSite',
    title: 'StaticSite',
    type: 'document',
    initialValue: () => ({
        staticSitePublishedAt: (new Date).toISOString(),
    }),
    fields: [
        {
            name: 'staticSiteTitle',
            type: 'string',
            title: 'Titel',
        },
        {
            title: "Slug",
            name: "staticSiteSlug",
            type: "slug",
            options: {
              source: "staticSiteTitle",
              maxLength: 200, // will be ignored if slugify is set
              slugify: input =>
                input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
            },
        },
        {
            name: 'staticSiteIntro',
            type: 'string',
            title: 'Intro',
        },
        {
            name: 'staticSiteContent',
            type: 'richText',
            title: 'Content',
        },
        {
            name: 'metadata',
            type: 'metadata',
            title: 'Metadata für Header (SEO)',
            description: 'Ausfüllen: Hilft, bessere Platzierungen bei Google & Co. zu erzielen.'
        },
        {
            name: "staticSitePublishedAt",
            title: "Published at",
            type: "datetime",
            validation: Rule => Rule.required().error('Datum ist Pflichtfeld'),
        },
    ]
}
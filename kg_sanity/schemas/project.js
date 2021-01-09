export default {
  name: 'project',
  title: 'Projekt',
  type: 'document',
  initialValue: () => ({
    publishedAt: (new Date).toISOString(),
    isBlog: false,
}),
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200, // will be ignored if slugify is set
        slugify: input =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: Rule => Rule.required().error('Slug ist Pflichtfeld'),
    },
    {
      name: 'short_description',
      title: 'Kurze Beschreibung',
      type: 'text',
    },
    { name: 'content',
      title: 'Inhalt',
      type: 'blockContent', 
    },
    {
      name: 'paintings',
      title: 'Bilder',
      type: 'array',
      of: [{ type: 'figure' }],
    },
    {
      name: 'isBlog',
      title: 'Beitrag ein Blog?',
      type: 'boolean',
      description: 'Ist der Beitrag ein Blog (relevant für SEO), Default-Wert: false'
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
      validation: Rule => Rule.required().error('Datum ist Pflichtfeld'),
    },
  ],
}

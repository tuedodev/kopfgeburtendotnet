export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            required: true,
        },
        {
            name: 'nickname',
            title: 'Nickname',
            type: 'string',
        },
        {
            name: 'email',
            title: 'E-Mail',
            type: 'string',
            validation: Rule => Rule.regex(/^[^@\s]+@[^@\s]+\.[^@\s]+$/).error('Keine gültige E-Mail-Adresse'),
        },
        {
            name: 'thumbnail',
            title: 'Thumbnail',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'joinedAt',
            title: 'Beigetreten am',
            type: 'datetime',
            validation: Rule => Rule.required().error('Datum ist Pflichtfeld'),
        },
    ]
}
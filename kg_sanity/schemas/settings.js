export default {
  name: "settings",
  title: "Settings",
  type: "document",
  fields: [
    {
      name: "websiteTitle",
      title: "Website-Titel",
      type: "string",
    },
    {
      name: "websiteSubtitle",
      title: "Website-Subtitel",
      type: "string",
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: false,
      },
    },
    {
      name: "defaultImage",
      title: "Default-Image (für SEO/Metatags)",
      type: "figure",
      description: "Wird herangezogen, wenn kein anderes Bild gefeatured ist (optimale Weite ca. 1200px)",
    },
    {
      name: "teaser",
      title: "Teaser (Seite 1)",
      type: 'array',
      of: [{ type: 'unionProjectAktuelles' }],
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
  ],
}

export default {
  name: "settings",
  title: "Settings",
  type: "document",
  initialValue: {
    aktuellesIsPaginated: true,
    aktuellesItemsPerPage: 7,
    projectsIsPaginated: true,
    projectsItemsPerPage: 7,
  },
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
      type: "array",
      of: [{ type: "unionProjectAktuelles" }],
    },
    {
      name: "aktuellesIsPaginated",
      title: "Rubrik Aktuelles: Liste wird paginiert",
      type: "boolean",
    },
    {
      name: "aktuellesItemsPerPage",
      title: "Rubrik Aktuelles: Anzahl der Listeneinträge",
      type: "number",
    },
    {
      name: "projectsIsPaginated",
      title: "Rubrik Arbeiten: Liste wird paginiert",
      type: "boolean",
    },
    {
      name: "projectsItemsPerPage",
      title: "Rubrik Arbeiten: Anzahl der Listeneinträge",
      type: "number",
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
  ],
}

export const NAVBAR = [
    {
        key:    1,
        title:  'Arbeiten',
        routing: 'arbeiten',
        className: 'nav-link',
    },
    {
        key:    2,
        title:  'Über',
        routing: 'ueber',
        className: 'nav-link',
    },
    {
        key:    3,
        title:  'Aktuelles',
        routing: 'aktuelles',
        className: 'nav-link',
    },
    {
        key:    4,
        title:  'Kontakt',
        routing: 'kontakt',
        className: 'nav-link',
    },
    {
        key:    5,
        title:  'Datenschutz',
        routing: 'datenschutz',
        className: 'nav-link',
    },
    {
        key:    6,
        title:  'Impressum',
        routing: 'impressum',
        className: 'nav-link',
    },
]

export const METADATA_DEFAULT = {
    title:  `${process.env.GATSBY_SITEMETADATA_TITLE}`,
    description: `${process.env.GATSBY_SITEMETADATA_DESCRIPTION}`
}

export const GATSBY_SITEMETADATA_TITLE = `${process.env.GATSBY_SITEMETADATA_TITLE}`;
export const GATSBY_SITEMETADATA_SUBTITLE = `${process.env.GATSBY_SITEMETADATA_SUBTITLE}`;

let today = new Date();
export const WEBSITE_PATH = `${process.env.GATSBY_SITEMETADATA_SITEURL}`;
export const WEBSITE_OWNER = `${process.env.GATSBY_SITEMETADATA_OWNER}`;
export const FOOTER_TEXT = `\u00A9 ${WEBSITE_OWNER} ${today.getFullYear()}`;
export const SOCIAL_MEDIA_LINK_FB = `${process.env.GATSBY_SITEMETADATA_SITEURL}`;
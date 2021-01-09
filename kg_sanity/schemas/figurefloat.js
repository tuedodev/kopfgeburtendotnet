export default {
    name: 'figurefloat',
    title: 'Image mit Float',
    type: 'object',
    fields: [
        {
            name: 'figure',
            type: 'figure',
            title: 'Bild',
        },
        {
            name: 'direction',
            type: 'string',
            title: 'Richtung/Position',
            options: {
                list: [
                  'Center',
                  'left',
                  'right'
                ], // <-- predefined values
                layout: 'dropdown' // <-- defaults to 'dropdown'
              }
        },
        {
            name: 'width',
            type: 'string',
            title: 'Width (% or px)',
        },
        {
            name: 'margin',
            type: 'string',
            title: 'Margin (px, rem or em)',
        },
        {
            name: 'wrapperClass',
            type: 'string',
            title: 'Container-/Wrapper-Klasse',
            description: 'Container/Wrapper-Klasse für Foto (wenn leer: nicht vorhanden)',
        },
        {
            name: 'cssClass',
            type: 'string',
            title: 'Zusätzliche CSS-Klasse',
            description: 'Zusätzliche CSS-Klasse für Foto/Bild',
        },
    ]
}
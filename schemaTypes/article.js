import {MdNewspaper} from 'react-icons/md';

export default {
    name: 'article',
    title: 'Actualité',
    type: 'document',
    icon: MdNewspaper,
    fields: [
        {
            name: 'title',
            title: 'Titre',
            type: 'string',
            validation: Rule => Rule.required().error('Le titre est obligatoire')
        },
        {
            name: 'slug',
            title: 'slug (URL)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            },
            description: 'URL de l\'article',
            validation: Rule => Rule.required()
        },
        {
            name: 'coverImage',
            title: 'Image de couverture',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Texte alternatif',
                    type: 'string'
                }
            ]
        },
        {
            name: 'exerpt',
            title: 'Résumé court',
            type: 'text',
            rows: 3,
            description: 'Résumé qui apparaîtra dans la liste des actualités'
        },
        {
            name: 'content',
            title: 'Contenu',
            type: 'array',
            of: [
                {
                    type: 'block'
                },
                {
                    type: 'image',
                    options: {
                        hotspot: true
                    }
                }
            ]
        },
        {
            name: 'publishedAt',
            title: 'Date de publication',
            type: 'datetime',
            initialValue: () => new Date().toISOString()
        },
        {
            name: 'author',
            title: 'Auteur',
            type: 'string',
            description: 'Nom de l\'auteur de l\'article'
        }
    ],
    preview: {
        select: {
            title: 'title',
            media: 'coverImage',
            date: 'publishedAt'
        },
        prepare(selection) {
            const {title, media, date} = selection
            return {
                title: title,
                subtitle: date ? new Date(date).toLocaleDateString('fr-FR') : 'Pas de date',
                media: media
            }
        }
    }
}
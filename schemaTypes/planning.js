import { MdCalendarMonth } from "react-icons/md"
export default {
    name: 'planning',
    title: 'Planning Mensuel',
    type: 'document',
    icon: MdCalendarMonth,
    fields: [
        {
            name: 'title',
            title: 'Titre',
            type: 'string',
            description: 'Ex: Planning Novembre 2025',
            validation: Rule => Rule.required().error('Le titre est obligatoire')
        },
        {
            name: 'month',
            title: 'Mois',
            type: 'date',
            description: 'Selectionnez le mois concerné',
            validation: Rule => Rule.required().error('Le mois est obligatoire')
        },
        {
            name: 'mediaType',
            title: 'Type de média',
            type: 'string',
            options: {
                list: [
                    {title: 'Image', value: 'image'},
                    {title: 'Vidéo', value: 'video'}
                ],
                layout: 'radio'
            },
            initialValue: 'image',
            validation: Rule => Rule.required()
        },
        {
            name: 'planningImage',
            title: 'Image du planning',
            type: 'image',
            description: 'Téléchargez l\'image du planning mensuel',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Texte alternatif',
                    type: 'string',
                    description: 'Ex: Planning des activités ESSE Novembre 2025'
                }
            ],
            hidden: ({parent}) => parent?.mediaType !== 'image'
        },
        {
            name: 'planningVideo',
            title: 'Vidéo du planning',
            type: 'file',
            description: 'Téléchargez une courte vidéo du planning mensuel',
            options: {
                accept: 'video/*'
            },
            hidden: ({parent}) => parent?.mediaType !== 'video'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4,
            description: 'Description optionnelle du planning (points forts du mois, etc.)'
        },
        {
            name: 'isActive',
            title: 'Planning Actif',
            type: 'boolean',
            description: 'Cochez pour afficher ce planning sur la page d\'accueil',
            initialValue: true
        }
    ],
    preview: {
        select: {
            title: 'title',
            image: 'planningImage',
            video: 'planningVideo',
            mediaType: 'mediaType',
            date: 'month'
        },
        prepare(selection) {
            const {title, image, video, mediaType, date} = selection
            return {
                title: title,
                subtitle: `${mediaType === 'video' ? 'Vidéo' : 'Image'} - ${date ? new Date(date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : 'Pas de date'}`,
                media: mediaType === 'video' ? video : image
            }
        }
    }
}
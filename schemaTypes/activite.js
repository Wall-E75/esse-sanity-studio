import { MdSportsHandball } from "react-icons/md"

export default {
    name: 'activite',
    title: 'Activité',
    type: 'document',
    icon: MdSportsHandball,
    fields: [
        {
            name: 'title',
            title: 'Nom de l\'activité',
            type: 'string',
            description: 'Ex: Football, Accompagnement scolaire, etc.',
            validation: Rule => Rule.required().error('Le nom de l\'activité est obligatoire')
        },
        {
            name: 'slug',
            title: 'slug (URL)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            },
            description: 'URL de la pge d\'activité',
            validation: Rule => Rule.required()
        },
        {
            name: 'structure',
            title: 'Structure',
            type: 'string',
            options: {
                list: [
                    {title: 'Gymnase', value: 'gymnase'},
                    {title: 'EVS (Espace de Vie Sociale)', value: 'evs'},
                    {title: 'Autre action', value: 'autre'}
                ],
                layout: 'radio'
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'category',
            title: 'Catégorie',
            type: 'string',
            options: {
                list: [
                    {title: 'Sport', value: 'sport'},
                    {title: 'Accompagnement scolaire', value: 'scolaire'},
                    {title: 'Atelier culturel', value: 'culturel'},
                    {title: 'Loisir', value: 'loisir'},
                    {title: 'Action sociale', value: 'social'},
                    {title: 'Autre', value: 'autre'}
                ]
            },
            description: 'Catégorie de l\'activité',
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
            name: 'description',
            title: 'Description',
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
            ],
            description: 'Description détaillée de l\'activité'
        },
        {
            name: 'schedule',
            title: 'Horaires',
            type: 'text',
            rows: 5,
            description: 'Ex: Tous les lundis de 18h à 20h, ou horaires variables selon planning mensuel'
        },
        {
            name: 'ageRange',
            title: 'Tranche d\'âge',
            type: 'string',
            description: 'Ex: 6-12 ans, Adultes, Tout public'
        },
        {
            name: 'instructor',
            title: 'Encadrant / Animateur',
            type: 'string',
            description: 'Nom de la personne qui encadre l\'activité'
        },
        {
            name: 'capacity',
            title: 'Nombre de places',
            type: 'number',
            description: 'Nombre maximum de participants'
        },
        {
            name: 'price',
            title: 'Tarif',
            type: 'string',
            description: 'Ex: Gratuit, 1€/séance, Adhésion annuelle de 5€, etc...'
        },
        {
            name: 'registrationRequired',
            title: 'Inscription nécessaire',
            type: 'boolean',
            description: 'Cochez si une inscription est obligatoire',
            initialValue: false
        },
        {
            name: 'contactInfo',
            title: 'Contact / Inscription',
            type: 'text',
            rows: 3,
            description: 'Email, téléphone ou informations pour s\'inscrire'
        },
        {
            name: 'isActive',
            title: 'Activité active',
            type: 'boolean',
            description: 'Décochez pour masquer temporairement l\'activité',
            initialValue: true
        },
        {
            name: 'order',
            title: 'Ordre d\'affichage',
            type: 'number',
            description: 'Pour trier les activités (1 = en premier)',
            initialValue: 0
        }
    ],
    orderings: [
        {
            title: 'Ordre d\'affichage',
            name: 'orderAsc',
            by: [
                {field: 'structure', direction: 'asc'},
                {field: 'title', direction: 'asc'}
            ]
        }
    ],
    preview: {
        select: {
            title: 'title',
            structure: 'structure',
            category: 'category',
            media: 'coverImage',
            isActive: 'isActive'
        },
        prepare(selection) {
            const {title, structure, category, media, isActive} = selection

            const structureLabel = {
                gymnase: 'Gymnase',
                evs: 'EVS',
                autre: 'Autre'
            }

            return {
                title: title,
                subtitle: `${structureLabel[structure] || ''} ${category ? '- ' + category : ''} ${!isActive ? '- Inactive' : ''}`,
                media: media
            }
        }
    }
}
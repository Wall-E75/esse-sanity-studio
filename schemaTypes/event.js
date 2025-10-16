import { validateBasePaths, validation } from "sanity";

export default {
    name: 'event',
    title: 'Evénement',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Titre',
            type: 'string',
            description: 'Ex: Tournoi de basket, Fête de l\'association...',
            validation: Rule => Rule.required().error('Le titre est obligatoiree')
        },
        {
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            },
            description: 'Cliquez sur "Generate" pour créer automatiquement l\'URL de l\'événement',
            validation: Rule => Rule.required()?.error('Le slug (URL) est obligatoire')
        },
        {
            name: 'structure',
            title: 'Lieu / Structure',
            type: 'string',
            options: {
                list: [
                    {title: 'Gymnase', value: 'gymnase'},
                    {title: 'EVS (Espace de Vie Sociale)', value: 'evs'},
                    {title: 'Extérieur', value: 'exterieur'},
                    {title: 'Autre', value: 'autre'}
                ],
                layout: 'radio'
            },
            validation: Rule => Rule.required().error('Le lieu est obligatoire')
        },
        {
            name: 'eventType',
            title: 'Type d\'événement',
            type: 'string',
            options: {
                list: [
                    {title: 'Compétition sportive', value: 'competition'},
                    {title: 'Portes ouvertes', value: 'portes-ouvertes'},
                    {title: 'Fête / Célébration', value: 'fete'},
                    {title: 'Sortie / Excursion', value: 'sortie'},
                    {title: 'Atelier ponctuel', value: 'atelier'},
                    {title: 'Collecte / Action solidaire', value: 'solidaire'},
                    {title: 'Autre', value: 'autre'}
                ]
            },
            description: 'Catégorie de l\'événement',
        },
        {
            name: 'coverImage',
            title: 'Image de l\'événement',
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
            description: 'Description détaillée de l\'événement'
        },
        {
            name: 'startDate',
            title: 'Date et heure de début',
            type: 'datetime',
            validation: Rule => Rule.required().error('La date de début est obligatoire')
        },
        {
            name: 'endDate',
            title: 'Date et heure de fin',
            type: 'datetime',
            description: 'Optionnel si l\'événement dure toute la journée ou quelques heures'
        },
        {
            name: 'location',
            title: 'Adresse / Lieu précis',
            type: 'string',
            description: 'Ex: Gymnase Chaumont, Metro Danube, EVS...'
        },
        {
            name: 'targetAudience',
            title: 'Public visé',
            type: 'string',
            description: 'Ex: Tout public, Adhérents uniquement, 6-12 ans, Familles'
        },
        {
            name: 'price',
            title: 'Tarif',
            type: 'string',
            description: 'Ex: Gratuit, 5€, Participation libre'
        },
        {
            name: 'capacity',
            title: 'Nombre de places',
            type: 'number',
            description: 'Nombre maximum de participants (optionnel)'
        },
        {
            name: 'registrationRequired',
            title: 'Inscription obligatoire',
            type: 'boolean',
            description: 'Cochez si une inscription préalable est nécessaire',
            initialValue: false
        },
        {
            name: 'registrationDeadline',
            title: 'Date limite d\'inscription',
            type: 'date',
            description: 'Si inscription obligatoire',
            hidden: ({parent}) => !parent?.registrationRequired
        },
        {
            name: 'contactInfo',
            title: 'Contact / Inscription',
            type: 'text',
            rows: 3,
            description: 'Email, téléphone ou lien pour s\'inscrire'
        },
        {
            name: 'isFeatured',
            title: 'Événement à la une',
            type: 'boolean',
            description: 'Afficher sur la page d\'accueil',
            initialValue: false
        },
        {
            name: 'status',
            title: 'Statut',
            type: 'string',
            options: {
                list: [
                    {title: '🟢 À venir', value: 'upcoming'},
                    {title: '🔴 Complet', value: 'full'},
                    {title: '⚪ Annulé', value: 'cancelled'},
                    {title: '✅ Terminé', value: 'past'}
                ],
                layout: 'radio'
            },
            initialValue: 'upcoming'
        }
    ],
    orderings: [
        {
            title: 'Date (plus récent en premier)',
            name: 'dateDesc',
            by: [
                {field: 'startDaate', direction: 'desc'}
            ]
        },
        {
            title: 'Date (plus ancien en premier)',
            name: 'dateAsc',
            by: [
                {field: 'startDate', direction: 'asc'}
            ]
        }
    ],
    preview: {
        select: {
            title: 'title',
            structure: 'structure',
            startDate: 'startDate',
            status: 'status',
            media: 'coverImage'
        },
        prepare(selection) {
            const {title, structure, startDate, status, media} = selection

            const structureLabels = {
                gymnase: '🏋️ Gymnase',
                evs: '🏠 EVS',
                exterieur: '🌳 Extérieur',
                autre: '📍 Autre'
            }

            const statusLabels = {
                upcoming: '🟢',
                full: '🔴 Complet',
                cancelled: '⚪ Annulé',
                past: '✅'
            }

            const dateFormatted = startDate
                ? new Date(startDate).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                })
                : 'Date non définie'

            return {
                title: title,
                subtitle: `${statusLabels[status] || ''} ${dateFormatted} • ${structureLabels[structure] || ''}`,
                media: media
            }

        }
    }
}
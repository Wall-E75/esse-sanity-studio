import { MdSettings } from "react-icons/md"

export default {
    name: 'siteSettings',
    title: 'Information Générales',
    type: 'document',
    icon: MdSettings,
    // Singleton - accès direct via la structure du studio (sanity.config.js)
    fields: [
        // IDENTITÉ //
        {
            name: 'associationName',
            title: 'Nom de l\'association',
            type: 'string',
            description: 'ESSE (Esprit, Savoir, Sport, Équité)',
            validation: Rule => Rule.required()
        },
        {
            name: 'tagline',
            title: 'Slogan / Devise',
            type: 'string',
            description: 'Ex: Esprit, Savoir, Sport, Équité'
        },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true
            },
            description: 'Logo de l\'association (format carré recommandé)'
        },
        {
            name: 'description',
            title: 'Description courte',
            type: 'text',
            rows: 4,
            description: 'Présentation en quelques lignes pour la page d\'accueil'
        },
        {
            name: 'longDescription',
            title: 'Présentation complète',
            type: 'array',
            of: [{type: 'block'}],
            description: 'Présentation détaillée pour la page "À propos"'
        },

        // === HERO ===
        {
            name: 'heroSlides',
            title: 'Images du Hero',
            type: 'array',
            description: 'Images qui défilent en arrière-plan de la page d\'accueil (3 à 5 images recommandées)',
            validation: Rule => Rule.max(8),
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'image',
                        title: 'Image',
                        type: 'image',
                        options: { hotspot: true },
                        validation: Rule => Rule.required()
                    },
                    {
                        name: 'alt',
                        title: 'Description de l\'image (accessibilité)',
                        type: 'string',
                        description: 'Ex: Cours de boxe au gymnase'
                    }
                ],
                preview: {
                    select: { media: 'image', title: 'alt' },
                    prepare({ media, title }) {
                        return { title: title || 'Slide sans description', media }
                    }
                }
            }]
        },

        // === ADRESSES ===
        {
            name: 'gymnaseAddress',
            title: 'Adresse du Gymnase',
            type: 'object',
            fields: [
                {
                    name: 'street',
                    title: 'Rue',
                    type: 'string'
                },
                {
                    name: 'city',
                    title: 'Ville',
                    type: 'string'
                },
                {
                    name: 'postalCode',
                    title: 'Code postal',
                    type: 'string'
                },
                {
                    name: 'googleMapsLink',
                    title: 'Lien Google Maps',
                    type: 'url',
                    description: 'Lien vers Google Maps pour le gymnase'
                },
                {
                    name: 'photo',
                    title: 'Photo du lieu',
                    type: 'image',
                    options: { hotspot: true },
                    description: 'Photo du gymnase (recommandé : format paysage 16/9)'
                }
            ]
        },
        {
            name: 'evsAddress',
            title: 'Adresse de l\'EVS',
            type: 'object',
            fields: [
                {
                    name: 'street',
                    title: 'Rue',
                    type: 'string'
                },
                {
                    name: 'city',
                    title: 'Ville',
                    type: 'string'
                },
                {
                    name: 'postalCode',
                    title: 'Code postal',
                    type: 'string'
                },
                {
                    name: 'googleMapsLink',
                    title: 'Lien Google Maps',
                    type: 'url',
                    description: 'Lien vers Google Maps pour l\'EVS'
                },
                {
                    name: 'photo',
                    title: 'Photo du lieu',
                    type: 'image',
                    options: { hotspot: true },
                    description: 'Photo de l\'EVS (recommandé : format paysage 16/9)'
                }
            ]
        },

        // === CONTACTS ===
        {
            name: 'email',
            title: 'Email principal',
            type: 'string',
            validation: Rule => Rule.email().error('Email invalide')
        },
        {
            name: 'phone',
            title: 'Téléphone',
            type: 'string'
        },
        {
            name: 'socialMedia',
            title: 'Réseaux sociaux',
            type: 'object',
            fields: [
                {
                    name: 'facebook',
                    title: 'Facebook',
                    type: 'url',
                    description: 'Lien vers la page Facebook'
                },
                {
                    name: 'instagram',
                    title: 'Instagram',
                    type: 'url',
                    description: 'Lien vers le profil Instagram'
                },
                {
                    name: 'tiktok',
                    title: 'Tiktok',
                    type: 'url'
                },
                {
                    name: 'youtube',
                    title: 'YouTube',
                    type: 'url'
                },
                {
                    name: 'linkedin',
                    title: 'LinkedIn',
                    type: 'url'
                }
            ]
        },

        // === DON ===
        {
            name: 'helloAssoLink',
            title: 'Lien Hello Asso',
            type: 'url',
            description: 'Lien vers la page de don Hello Asso',
            validation: Rule => Rule.required().error('Le lien Hello Asso est obligatoire')
        },

        // === CHIFFRES CLÉS ===
        {
            name: 'keyStats',
            title: 'Chiffres clés',
            type: 'array',
            description: 'Les chiffres affichés dans la section "ESSE en chiffres" de la page À propos',
            validation: Rule => Rule.max(6),
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'value',
                        title: 'Valeur',
                        type: 'string',
                        description: 'Ex: 800',
                        validation: Rule => Rule.required()
                    },
                    {
                        name: 'suffix',
                        title: 'Suffixe',
                        type: 'string',
                        description: 'Ex: + ou % (laisser vide si aucun)',
                    },
                    {
                        name: 'label',
                        title: 'Libellé',
                        type: 'string',
                        description: 'Ex: Adhérents',
                        validation: Rule => Rule.required()
                    }
                ],
                preview: {
                    select: { value: 'value', suffix: 'suffix', title: 'label' },
                    prepare({ value, suffix, title }) {
                        return { title: `${value}${suffix ?? ''} — ${title}` }
                    }
                }
            }]
        },

        // === HORAIRES ===
        {
            name: 'openingHours',
            title: 'Horaires d\'ouverture',
            type: 'object',
            description: 'Horaires généraux de l\'association',
            fields: [
                {
                    name: 'gymnase',
                    title: 'Horaires Gymnase',
                    type: 'text',
                    rows: 5,
                    description: 'Ex: Lundi-Vendredi: 17h-21h, Samedi: 9h-18h'
                },
                {
                    name: 'evs',
                    title: 'Horaires EVS',
                    type: 'text',
                    rows: 5,
                    description: 'Ex: Lundi-Jeudi: 16h-20h'
                }
            ]
        },
        {
            name: 'legalDocuments',
            title: 'Documents légaux',
            type: 'object',
            fields: [
                {
                    name: 'mentionsLegales',
                    title: 'Mentions légales',
                    type: 'array',
                    of: [{type: 'block'}],
                    description: 'Texte des mentions légales'
                },
                {
                    name: 'politiqueConfidentialite',
                    title: 'Politique de confidentialité',
                    type: 'array',
                    of: [{type: 'block'}]
                },
                {
                    name: 'cgu',
                    title: 'Conditions générales d\'utilisation',
                    type: 'array',
                    of: [{type: 'block'}]
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'associationName',
            subtitle: 'tagline',
            media: 'logo'
        }
    }
}
import { MdHandshake } from "react-icons/md"
export default {
    name: 'partenaire',
    title: 'Partenaire',
    type: 'document',
    icon: MdHandshake,
    fields: [
        {
            name: 'name',
            title: 'Nom du partenaire',
            type: 'string',
            validation: Rule => Rule.required().error('Le nom est obligatoire')
        },
        {
            name: 'logo',
            title: 'Logo',
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
            ],
            validation: Rule => Rule.required().error('Le logo est obligatoire')
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            description: 'Courte présentation du partenaire'
        },
        {
            name: 'website',
            title: 'Site web',
            type: 'url',
            description: 'Site web du partenaire'
        },
        {
            name: 'partnershipType',
            title: 'Type de partenariat',
            type: 'string',
            options: {
                list: [
                    {title: 'Financier', value: 'financier'},
                    {title: 'Matériel', value: 'materiel'},
                    {title: 'Institutionnel', value: 'institutionnel'},
                    {title: 'Associatif', value: 'associatif'},
                    {title: 'Autre', value: 'autre'}
                ],
                layout: 'radio'
            }
        },
        {
            name: 'category',
            title: 'Catégorie',
            type: 'string',
            options: {
                list: [
                    {title: '⭐ Partenaire principal', value: 'principal'},
                    {title: '🥈 Partenaire', value: 'standard'},
                    {title: '🤝 Soutien', value: 'soutien'}
                ],
                layout: 'radio'
            },
            initialValue: 'standard'
        },
        {
            name: 'startDate',
            title: 'Début du partenariat',
            type: 'date',
            description: 'Date de début du partenariat'
        },
        {
            name: 'isActive',
            title: 'Partenariat actif',
            type: 'boolean',
            description: 'Décochez pour les anciens partenaires',
            initialValue: true
        },
        {
            name: 'order',
            title: 'Ordre d\'affichage',
            type: 'number',
            description: 'Pour trier les partenaires (1 = en premier)',
            initialValue: 99
        }
    ],
     orderings: [
        {
            title: 'Ordre d\'affichage',
            name: 'orderAsc',
            by: [
                {field: 'order', direction: 'asc'}
            ]
        },
        {
            title: 'Par catégorie',
            name: 'categoryDesc',
            by: [
                {field: 'category', direction: 'asc'},
                {field: 'name', direction: 'asc'}
            ]
        }
    ],
    preview: {
        select: {
            title: 'name',
            category: 'category',
            partnershipType: 'partnershipType',
            media: 'logo',
            isActive: 'isActive'
        },
        prepare(selection) {
            const {title, category, partnershipType, media, isActive} = selection
      
            const categoryLabels = {
                principal: '⭐ Principal',
                standard: '🥈 Partenaire',
                soutien: '🤝 Soutien'
            }
      
            return {
                title: title,
                subtitle: `${categoryLabels[category] || ''} ${partnershipType ? '• ' + partnershipType : ''} ${!isActive ? '• Inactif' : ''}`,
                media: media
            }
        }
    }
}

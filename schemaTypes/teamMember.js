import { MdPeople } from "react-icons/md"

export default {
    name: 'teamMember',
    title: 'Membre du bureau',
    type: 'document',
    icon: MdPeople,
    fields: [
        {
            name: 'name',
            title: 'Nom complet',
            type: 'string',
            validation: Rule => Rule.required().error('Le nom est obligatoire')
        },
        {
            name: 'role',
            title: 'Fonction / Rôle',
            type: 'string',
            description: 'Ex: Président(e), Trésorier(ère), Secrétaire, Membre actif',
            validation: Rule => Rule.required().error('Le rôle est obligatoire')
        },
        {
            name: 'group',
            title: 'Groupe / Instance',
            type: 'string',
            options: {
                list: [
                    {title: 'Bureau', value: 'bureau'},
                    {title: 'Conseil d\'administration', value: 'ca'},
                    {title: 'Equipe opérationnelle', value: 'equipe'},
                    {title: 'Bénévoles actifs', value: 'benevoles'}
                ],
                layout: 'radio'
            },
            validation: Rule => Rule.required().error('Le groupe est obligatoire'),
            description: 'Sélectionnez le groupe auquel ce membre appartient'
        },
        {
            name: 'photo',
            title: 'Photo',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Texte alternatif',
                    type: 'string',
                }
            ],
            description: 'Photo de profil du membre'
        },
        {
            name: 'bio',
            title: 'Biographie',
            type: 'text',
            rows: 4,
            description: 'Courte présentation du membre (optionnel)'
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: Rule => Rule.email().error('Veuillez entrer une adresse email valide'),
        },
        {
            name: 'phone',
            title: 'Téléphone',
            type: 'string',
            description: 'Optionnel - uniquement si le membre souhaite être contacté'
        },
        {
            name: 'responsabilities',
            title: 'Résponsabilités',
            type: 'array',
            of: [{type: 'string'}],
            description: 'Liste des responsabilités du membre',
            options: {
                layout: 'tags'
            }
        },
        {
            name: 'order',
            title: 'Ordre d\'affichage',
            type: 'number',
            description: 'Pour trier les membres (1 = en premier, 2 = deuxième, etc.)',
            initialValue: 99,
            validation: Rule => Rule.required().min(1)
        },
        {
            name: 'isActive',
            title: 'Membre actif',
            type: 'boolean',
            description: 'Décochez pour les anciens membres',
            initialValue: true
        },
        {
            name: 'joinedDate',
            title: 'Date d\'arrivée',
            type: 'date',
            description: 'Date d\'entrée au bureau'
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
            title: "Par groupe",
            name: 'groupeAsc',
            by: [
                {field: 'group', direction: 'asc'},
                {field: 'order', direction: 'asc'}
            ]
        },
        {
            title: 'Par rôle',
            name: 'roleAsc',
            by: [
                {field: 'role', direction: 'asc'},
                {field: 'name', direction: 'asc'}
            ]
        }
    ],
    preview: {
        select: {
            title: 'name',
            role: 'role',
            group: 'group',
            media: 'photo',
            isActive: 'isActive',
            order: 'order'
        },
        prepare(selection) {
            const {title, role, group, media, isActive, order} = selection

            const groupLabels = {
                ca: '👔 CA',
                bureau: '💼 Bureau',
                equipe: '⚙️ Équipe',
                benevoles: '🤝 Bénévole'
            }

            return {
                title: title,
                subtitle: `${groupLabels[group] || ''} • ${role} ${!isActive ? '• Inactif' : ''} • Ordre: ${order}`,
                media: media
            }
        }
    }
}
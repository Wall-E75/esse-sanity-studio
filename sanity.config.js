import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Association ESSE',

  projectId: 'b1t2bis9',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Association ESSE')
          .items([
            // Singleton : accès direct au document unique
            S.listItem()
              .title('Informations du site')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Informations du site')
              ),

            S.divider(),

            // Contenu éditorial — du plus fréquent au moins fréquent
            S.documentTypeListItem('article').title('Actualités'),
            S.documentTypeListItem('event').title('Événements'),
            S.documentTypeListItem('planning').title('Plannings Mensuels'),

            S.divider(),

            S.documentTypeListItem('activite').title('Activités'),

            S.divider(),

            S.documentTypeListItem('teamMember').title("Membres de l'équipe"),
            S.documentTypeListItem('partenaire').title('Partenaires'),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})

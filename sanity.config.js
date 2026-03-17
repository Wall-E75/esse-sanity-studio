import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Association ESSE',

  projectId: 'b1t2bis9',
  dataset: 'production',

  // Empêche la création et la suppression du document siteSettings
  document: {
    newDocumentOptions: (prev) =>
      prev.filter((template) => template.templateId !== 'siteSettings'),
    actions: (prev, {schemaType}) => {
      if (schemaType === 'siteSettings') {
        return prev.filter(({action}) => action !== 'delete' && action !== 'duplicate')
      }
      return prev
    },
  },

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Association ESSE')
          .items([
            // Singleton : ouverture directe du document existant
            S.listItem()
              .title('Informations du site')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('867ab9f2-7c0e-478c-b59b-13e8aba0e00a')
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
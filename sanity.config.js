import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
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
            // === CONFIGURATION ===
            S.listItem()
              .title('⚙️ Configuration')
              .child(
                S.list()
                  .title('Configuration')
                  .items([
                    S.documentTypeListItem('siteSettings').title('Informations Générales'),
                  ])
              ),
            
            S.divider(),
            
            // === CONTENU ===
            S.listItem()
              .title('📝 Contenu')
              .child(
                S.list()
                  .title('Contenu')
                  .items([
                    S.documentTypeListItem('article').title('Actualités'),
                    S.documentTypeListItem('planning').title('Plannings Mensuels'),
                  ])
              ),
            
            S.divider(),
            
            // === ACTIVITÉS & ÉVÉNEMENTS ===
            S.listItem()
              .title('🎯 Activités & Événements')
              .child(
                S.list()
                  .title('Activités & Événements')
                  .items([
                    S.documentTypeListItem('activite').title('Activités'),
                    S.documentTypeListItem('event').title('Événements'),
                  ])
              ),
            
            S.divider(),
            
            // === ÉQUIPE & PARTENAIRES ===
            S.listItem()
              .title('👥 Équipe & Partenaires')
              .child(
                S.list()
                  .title('Équipe & Partenaires')
                  .items([
                    S.documentTypeListItem('teamMember').title('Membres du bureau'),
                    S.documentTypeListItem('partenaire').title('Partenaires'),
                  ])
              ),
          ])
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})

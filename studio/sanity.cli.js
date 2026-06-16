import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'n19hhkh5',
    dataset: 'production'
  },
  deployment: {
    appId: 'nkig1v9nficklr78u099hmro',
    autoUpdates: true,
  }
})

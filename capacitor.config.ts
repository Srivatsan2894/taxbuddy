import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.taxbuddy.app',
  appName: 'TaxBuddy',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    Storage: {
      group: 'taxbuddy',
    },
  },
}

export default config

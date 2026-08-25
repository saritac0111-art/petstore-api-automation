import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

const environment = process.env.ENV || 'qa';

dotenv.config({
  path: `./environments/${environment}.env`
});

export default defineConfig({
  testDir: './tests',

  retries: process.env.CI ? 2 : 1,

  use: {
    baseURL: process.env.BASE_URL
  },

  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: `playwright-report/${environment}`,
        open: 'never'
      }
    ]
  ],

  workers: 5
});
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
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  },

  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],

  workers: 5
});
import { test as base } from '@playwright/test';
import { PetApi } from '../api/petApi';

type ApiFixtures = {
  petApi: PetApi;
};

export const test = base.extend<ApiFixtures>({
  petApi: async ({ request }, use) => {
    const petApi = new PetApi(request);

    await use(petApi);
  }
});

export { expect } from '@playwright/test';
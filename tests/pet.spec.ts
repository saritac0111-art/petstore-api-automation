import { test, expect } from '../fixtures/apiFixture';
import {
  createPetData,
  defaultHeaders,
  expectedUpdateData
} from '../data/petData';
import { validateStatus } from '../utils/apiAssertions';

test.describe.configure({ mode: 'parallel' });

test.describe('Petstore API Tests', () => {

  test('Create Pet - POST', async ({ petApi }) => {

    const petData = createPetData();

    const response = await petApi.createPet(
      petData,
      defaultHeaders
    );

    await validateStatus(response, 200);

    const createdPet = await response.json();

    expect(createdPet.id).toBe(petData.id);
    expect(createdPet.name).toBe(petData.name);
    expect(createdPet.status).toBe(petData.status);

    await petApi.deletePet(
      petData.id,
      defaultHeaders
    );
  });


  test('Create Pet and Verify with GET', async ({ petApi }) => {

    const petData = createPetData();

    const createResponse = await petApi.createPet(
      petData,
      defaultHeaders
    );

    await validateStatus(createResponse, 200);

    const createdPet = await createResponse.json();

    const getResponse = await petApi.getPet(
      petData.id,
      defaultHeaders
    );

    await validateStatus(getResponse, 200);

    const fetchedPet = await getResponse.json();

    expect(fetchedPet.id).toBe(createdPet.id);
    expect(fetchedPet.name).toBe(createdPet.name);
    expect(fetchedPet.status).toBe(createdPet.status);
    expect(fetchedPet.category).toEqual(createdPet.category);
    expect(fetchedPet.photoUrls).toEqual(createdPet.photoUrls);
    expect(fetchedPet.tags).toEqual(createdPet.tags);

    await petApi.deletePet(
      petData.id,
      defaultHeaders
    );
  });


  test('Update Pet - PUT', async ({ petApi }) => {

    const petData = createPetData();

    const createResponse = await petApi.createPet(
      petData,
      defaultHeaders
    );

    await validateStatus(createResponse, 200);

    const updatedPetData = {
      ...petData,
      status: expectedUpdateData.status
    };

    const updateResponse = await petApi.updatePet(
      updatedPetData,
      defaultHeaders
    );

    await validateStatus(updateResponse, 200);

    const updatedPet = await updateResponse.json();

    expect(updatedPet.id).toBe(petData.id);
    expect(updatedPet.name).toBe(petData.name);
    expect(updatedPet.status).toBe(expectedUpdateData.status);

    await petApi.deletePet(
      petData.id,
      defaultHeaders
    );
  });


  test('Delete Pet - DELETE', async ({ petApi }) => {

    const petData = createPetData();

    const createResponse = await petApi.createPet(
      petData,
      defaultHeaders
    );

    await validateStatus(createResponse, 200);

    const deleteResponse = await petApi.deletePet(
      petData.id,
      defaultHeaders
    );

    await validateStatus(deleteResponse, 200);
  });


  test('Get Non-Existing Pet - 404', async ({ petApi }) => {

    const nonExistingPetId = 999999999999999999;

    const response = await petApi.getPet(
      nonExistingPetId,
      defaultHeaders
    );

    await validateStatus(response, 404);
  });

});
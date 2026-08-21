import { test, expect } from '../fixtures/apiFixture';
import { createPetData } from '../data/petData';

test.describe.configure({ mode: 'parallel' });

test.describe('Petstore API Tests', () => {

  test('Create Pet - POST', async ({ petApi }) => {

    const petData = createPetData();

    const response = await petApi.createPet(petData);

    expect(response.status()).toBe(200);

    const createdPet = await response.json();

    expect(createdPet.id).toBe(petData.id);
    expect(createdPet.name).toBe(petData.name);
    expect(createdPet.status).toBe(petData.status);

    // Cleanup
    await petApi.deletePet(petData.id);
  });


  test('Create Pet and Verify with GET', async ({ petApi }) => {

    // Create
    const petData = createPetData();

    const createResponse = await petApi.createPet(petData);

    expect(createResponse.status()).toBe(200);

    const createdPet = await createResponse.json();

    // Wait until the created pet is available through GET
    let getResponse;

    await expect.poll(
      async () => {
        getResponse = await petApi.getPet(petData.id);
        return getResponse.status();
      },
      {
        timeout: 15000,
        intervals: [500, 1000, 2000, 3000]
      }
    ).toBe(200);

    // Get and verify the created pet
    const fetchedPet = await getResponse!.json();

    expect(fetchedPet.id).toBe(createdPet.id);
    expect(fetchedPet.name).toBe(createdPet.name);
    expect(fetchedPet.status).toBe(createdPet.status);
    expect(fetchedPet.category).toEqual(createdPet.category);
    expect(fetchedPet.photoUrls).toEqual(createdPet.photoUrls);
    expect(fetchedPet.tags).toEqual(createdPet.tags);

    // Cleanup
    await petApi.deletePet(petData.id);
  });


  test('Update Pet - PUT', async ({ petApi }) => {

    // Create a pet first
    const petData = createPetData();

    const createResponse = await petApi.createPet(petData);

    expect(createResponse.status()).toBe(200);

    // Update
    const updatedPetData = {
      ...petData,
      name: 'UpdatedAutomationPet',
      status: 'sold'
    };

    const updateResponse = await petApi.updatePet(updatedPetData);

    expect(updateResponse.status()).toBe(200);

    const updatedPet = await updateResponse.json();

    expect(updatedPet.id).toBe(petData.id);
    expect(updatedPet.name).toBe('UpdatedAutomationPet');
    expect(updatedPet.status).toBe('sold');

    // Cleanup
    await petApi.deletePet(petData.id);
  });


  test('Delete Pet - DELETE', async ({ petApi }) => {

    // Create a pet first
    const petData = createPetData();

    const createResponse = await petApi.createPet(petData);

    expect(createResponse.status()).toBe(200);

    // Delete
    const deleteResponse = await petApi.deletePet(petData.id);

    expect(deleteResponse.status()).toBe(200);
  });


  test('Get Non-Existing Pet - 404', async ({ petApi }) => {

    const nonExistingPetId = 999999999999999999;

    const response = await petApi.getPet(nonExistingPetId);

    expect(response.status()).toBe(404);
  });

});
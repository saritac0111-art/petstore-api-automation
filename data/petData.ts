export const defaultHeaders: Record<string, string> = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

export const expectedUpdateData = {
  status: 'sold'
};

export function createPetData() {
  const petId = Date.now();
  const petName = `AutomationTestPet_${petId}`;

  return {
    id: petId,

    category: {
      id: 1,
      name: 'Dogs'
    },

    name: petName,

    photoUrls: [
      `https://example.com/${petName}.jpg`
    ],

    tags: [
      {
        id: 1,
        name: 'automation'
      }
    ],

    status: 'available'
  };
}
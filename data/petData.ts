export function createPetData() {
  return {
    id: Date.now(),
    category: {
      id: 1,
      name: 'Dogs'
    },
    name: 'AutomationTestPet',
    photoUrls: [
      'https://example.com/dog.jpg'
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
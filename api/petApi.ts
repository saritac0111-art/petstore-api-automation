import { APIRequestContext, APIResponse } from '@playwright/test';

export class PetApi {

  constructor(private request: APIRequestContext) {}

  async createPet(petData: object): Promise<APIResponse> {
    const response = await this.request.post('pet', {
      data: petData,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    return response;
  }

  async getPet(petId: number): Promise<APIResponse> {
    return await this.request.get(`pet/${petId}`);
  }

  async updatePet(petData: object): Promise<APIResponse> {
    return await this.request.put('pet', {
      data: petData,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  async deletePet(petId: number): Promise<APIResponse> {
    return await this.request.delete(`pet/${petId}`);
  }
}
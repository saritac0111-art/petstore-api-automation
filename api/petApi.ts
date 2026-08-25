import { APIRequestContext, APIResponse } from '@playwright/test';

export class PetApi {

  constructor(private request: APIRequestContext) {}

  async createPet(
    petData: object,
    headers: Record<string, string>
  ): Promise<APIResponse> {

    return await this.request.post('pet', {
      data: petData,
      headers
    });
  }

  async getPet(
    petId: number,
    headers: Record<string, string>
  ): Promise<APIResponse> {

    return await this.request.get(`pet/${petId}`, {
      headers
    });
  }

  async updatePet(
    petData: object,
    headers: Record<string, string>
  ): Promise<APIResponse> {

    return await this.request.put('pet', {
      data: petData,
      headers
    });
  }

  async deletePet(
    petId: number,
    headers: Record<string, string>
  ): Promise<APIResponse> {

    return await this.request.delete(`pet/${petId}`, {
      headers
    });
  }
}
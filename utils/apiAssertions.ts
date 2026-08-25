import { expect, APIResponse } from '@playwright/test';

export async function validateStatus(
  response: APIResponse,
  expectedStatus: number
): Promise<void> {
  expect(response.status()).toBe(expectedStatus);
}
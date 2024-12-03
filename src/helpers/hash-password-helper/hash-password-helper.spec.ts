// import { Injectable } from '@nestjs/common';
// import { compare, hash } from 'bcryptjs';
import { HashPasswordHelper } from './hash-password-helper';

describe('HashPasswordHelper', () => {
  it('should be defined', () => {
    expect(HashPasswordHelper).toBeDefined();
  });

  it('should hash a password', async () => {
    const password = 'mySecretPassword123!';
    const hashedPassword = await HashPasswordHelper.hashPassword(password);

    expect(hashedPassword).toBeDefined();
    expect(typeof hashedPassword).toBe('string');
  });

  it('should compare a password with a hash', async () => {
    const password = 'mySecretPassword123!';
    const hashedPassword = await HashPasswordHelper.hashPassword(password);

    const isValid = await HashPasswordHelper.comparePassword(
      password,
      hashedPassword,
    );

    expect(isValid).toBeTruthy();
  });
});

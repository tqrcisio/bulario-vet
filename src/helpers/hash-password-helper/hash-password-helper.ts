import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
@Injectable()
export class HashPasswordHelper {
  /**
   * Hashes a given password using bcrypt. The salt can be provided and will default to 10 if not given.
   * @param password The password to hash
   * @param salt The salt to use when hashing the password. If not given, then 10 will be used.
   * @returns A promise that resolves to a string representing the hashed password.
   */
  static async hashPassword(
    password: string,
    salt?: string | number,
  ): Promise<string> {
    salt = salt || 8;
    return hash(password, salt);
  }

  static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}

import { ErrorStructure, generateErrorStructure } from "$validations/helper";
import { UserLoginDTO } from "$entities/User";

export function validateLoginPayload(payload: UserLoginDTO): ErrorStructure[] {
  const errors: ErrorStructure[] = [];

  if (!payload.email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(payload.email)) {
    errors.push(generateErrorStructure("email", "Invalid email format"));
  }

  if (!payload.password || payload.password.length < 6) {
    errors.push(generateErrorStructure("password", "Password must be at least 6 characters long"));
  }

  return errors;
}

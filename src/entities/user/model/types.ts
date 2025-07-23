export interface User {
  id: number | string; // Поддержка и чисел, и UUID
  name: string;
  surName: string;
  fullName: string;
  email: string;
  birthDate?: string;
  telephone?: string;
  employment?: string;
  userAgreement?: boolean;
}

export interface UpdateUserDto {
  name?: string;
  surName?: string;
  fullName?: string;
  birthDate?: string;
  telephone?: string;
  employment?: string;
  userAgreement?: boolean;
}
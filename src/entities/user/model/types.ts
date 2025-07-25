export interface User {
  id: number | string;
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
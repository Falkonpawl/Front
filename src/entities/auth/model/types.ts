export interface User {
  id: number | string 
  name: string
  surName: string
  fullName: string
  email: string
  birthDate?: string 
  telephone?: string
  employment?: string
  userAgreement?: boolean
}

export interface UserFormValues {
  name: string
  surName: string
  fullName: string
  email: string
  password: string
  confirmPassword?: string
  birthDate: string
  telephone: string
  employment: string
  userAgreement: boolean
}

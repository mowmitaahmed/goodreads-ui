export class RegistrationModel{
    _id ?: string;
    fullName: string = '';
    email: string = '';
    phoneNo: string = '';
    password: string = '';
    confirmPassword: string = '';
    gender: string = '';
    createdAt?: Date = new Date();
    updatedAt?: Date = new Date();
}
export enum UserStatus {
    ACTIVE   = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export enum CreatedBy {
    ADMIN = 'ADMIN',
    USER  = 'USER'
}

export interface User {
    userId: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    status: UserStatus;
    createdBy: CreatedBy;
}

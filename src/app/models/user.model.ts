export interface User {
    id: number;
    data: Person;
    password: string;
    createdAt?: Date;
}

export interface Person {
    id: number;
    name: string;
    lastName: string;
    fullName?: string;
    documentType: string;
    document: string;
    identification?: string;
    email: string;
    createdAt?: Date;
}

export interface UserAccount {
    email: string;
    password: string;
}
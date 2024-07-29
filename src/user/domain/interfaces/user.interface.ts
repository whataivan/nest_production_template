
export interface IUser {
    id: number;
    email: string;
    name?: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
    // sessions: AuthSession[];
}
export interface AppUserGetDto {
    id: string;
    name: string;
    userName: string;
    email: string;
    lastLoginTime: Date;
    isBlocked: boolean;
}
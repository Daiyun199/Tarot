export interface User{
    id:string;
    name:string;
    status:string;
    role: 'READER' | "CUSTOMER" | "ADMIN" ;
}
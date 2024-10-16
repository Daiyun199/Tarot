export interface UserData {
    name: string;
    id: string;
    dob: string | null;
    nickname: string | null;
    gender: string | null;
    phone: string | null;
    email: string | null;
    imgUrl: string | null;
    isConfirmed: boolean;
    isDeleted: boolean;
    password: string;
    premium: boolean;
    rate: number | null;
    role: string;
    status: string;
  }
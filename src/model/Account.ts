export interface Account {
  id: string;
  email: string;
  password: string; // Nên tránh lưu mật khẩu trong state
  name: string;
  dob: string; // Bạn có thể sử dụng Date nếu cần
  gender: string;
  phone: string;
  role: string;
  status: string;
  rate: number | null;
  premium: boolean;
  imgUrl: string;
  isDeleted: boolean;
  isConfirmed: boolean;
}

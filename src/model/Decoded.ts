import { JwtPayload } from 'jwt-decode';

// Interface mở rộng JwtPayload để bao gồm role
export interface DecodedToken extends JwtPayload {
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string; // Có thể là undefined
    // Thêm các trường khác nếu cần
}
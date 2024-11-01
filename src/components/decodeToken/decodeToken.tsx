// decodeToken.ts
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../model/Decoded";

const decodeUserRole = (token: string | undefined): string | undefined => {
  if (typeof token === "string" && token.trim().length > 0) {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      return decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }
  return undefined;
};

export default decodeUserRole;

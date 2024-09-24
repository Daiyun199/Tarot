import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
declare const storage: import("@firebase/storage").FirebaseStorage;
declare const googleProvider: GoogleAuthProvider;
declare const auth: import("@firebase/auth").Auth;
declare const facebookProvider: FacebookAuthProvider;
export { storage, googleProvider, auth, facebookProvider };

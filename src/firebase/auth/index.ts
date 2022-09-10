import { getAuth, signInWithRedirect } from 'firebase/auth';
import GoogleProvider from './google';
import FirebaseApp from '../config';

export const auth = getAuth(FirebaseApp);

export const signInWithGoogle = () => {
  signInWithRedirect(auth, GoogleProvider);
};

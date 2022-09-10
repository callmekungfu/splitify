import { getAuth, getRedirectResult } from 'firebase/auth';
import FirebaseApp from '../config';

const auth = getAuth(FirebaseApp);
export const setupAuthRedirectHandler = () =>
  getRedirectResult(auth)
    .then((result) => {
      if (result === null) {
        return;
      }

      // The signed-in user info.
      // const user = result.user;
    })
    .catch(() => {
      console.log('sign in failed');
    });

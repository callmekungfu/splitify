import { getFirestore } from 'firebase/firestore/lite';
import FirebaseApp from '../config';
const FirestoreDB = getFirestore(FirebaseApp);

export default FirestoreDB;

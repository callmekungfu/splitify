import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import db from './config';

const COLLECTION_KEY = 'participants';

export const listMyParticipants = async (userId: string) => {
  const participantsCol = query(
    collection(db, COLLECTION_KEY),
    where('ownerId', '==', userId),
  );
  const participantsSnapshot = await getDocs(participantsCol);
  const participantsList = participantsSnapshot.docs.map((doc) => doc.data());
  return participantsList;
};

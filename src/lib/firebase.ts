import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './firestoreUtils';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Test connection
async function testConnection() {
  const testPath = 'test/connection';
  try {
    await getDocFromServer(doc(db, testPath));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    } else {
      handleFirestoreError(error, OperationType.GET, testPath);
    }
  }
}
testConnection();

import { ref, get } from 'firebase/database';
import { db } from '../config/firebaseConfig';

export const getUserData = async (uid: string) => {
  const userRef = ref(db, `/users/${uid}`);
  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    return { ref: userRef, data: snapshot.val() };
  } else {
    throw new Error('Usuario no encontrado en la base de datos');
  }
};

export const getUsers = async () => {
  try {
    const usersRef = ref(db, '/users');
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      const users = snapshot.val();

      // Ordenamos los usuarios manualmente en el cliente por el campo 'score'
      const sortedUsers = Object.keys(users)
        .map((key) => ({
          id: key,
          ...users[key],
        }))
        .sort((a, b) => b.score - a.score); // Ordena en orden descendente por score

      return sortedUsers;
    } else {
      throw new Error('No se encontraron usuarios');
    }
  } catch (err) {
    console.error('Error obteniendo usuarios:', err);
    throw err;
  }
};

import type { User } from '~/types';
import { doc, getFirestore } from 'firebase/firestore';

export const useUser = (): Ref<User | null> => {
  const currentAuthUser = useCurrentUser();
  if (!currentAuthUser.value) return ref(null);

  const user = ref<User | null>(null);

  const db = getFirestore();
  const docRef = doc(db, 'users', currentAuthUser.value.uid);
  const userDocument = useDocument(docRef);
  console.log('userDocument', userDocument.value);

  watchEffect(() => {
    if (userDocument.value) {
      user.value = userDocument.value as User;
      console.log('user', user.value);
    }
  });

  return user;
};

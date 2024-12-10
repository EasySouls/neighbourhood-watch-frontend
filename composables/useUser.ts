import type { User } from '~/types';
import { doc, getFirestore } from 'firebase/firestore';

export const useUser = (): Ref<User | null> => {
  const currentAuthUser = useCurrentUser();
  if (!currentAuthUser.value) return ref(null);

  const db = getFirestore();
  const docRef = doc(db, 'users', currentAuthUser.value.uid);
  const userDocument = useDocument(docRef);
  const user = computed(() => userDocument.value as User | null);
  return user;
};

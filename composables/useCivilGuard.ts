import { doc, getFirestore } from 'firebase/firestore';
import type { CivilGuard } from '~/types';

export const useCivilGuard = (): Ref<CivilGuard | null> => {
  const user = useUser();
  if (!user.value) return ref(null);
  if (!user.value.civilGuardId || !user.value.departmentId) return ref(null);

  const db = getFirestore();
  const docRef = doc(
    db,
    'departments',
    user.value.departmentId,
    'civilGuards',
    user.value.civilGuardId
  );
  const civilGuardDocument = useDocument(docRef);
  const civilGuard = computed(
    () => civilGuardDocument.value as CivilGuard | null
  );
  return civilGuard;
};

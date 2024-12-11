import { doc, getFirestore } from 'firebase/firestore';
import type { Department } from '~/types';

export const useDepartment = () => {
  const user = useUser();
  if (!user.value || !user.value.departmentId || !user.value.civilGuardId) {
    return ref(null);
  }

  const db = getFirestore();
  const docRef = doc(db, 'departments', user.value.departmentId);
  const departmentDocument = useDocument(docRef);
  const department = computed(
    () => departmentDocument.value as Department | null
  );
  return department;
};

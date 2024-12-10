export interface User {
  id: string;
  authId: string;
  email: string;
  firstName: string;
  lastName: string;
  pfpUrl?: string;
  createdAt: number;
  updatedAt: number;
}

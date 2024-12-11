export interface User {
  id: string;
  authId: string;
  civilGuardId?: string;
  departmentId?: string;
  email: string;
  firstName: string;
  lastName: string;
  pfpUrl?: string;
  createdAt: number;
  updatedAt: number;
}

export interface CivilGuard {
  id: string;
  userId: string;
  name: string;
  departmentId: string;
  createdAt: number;
  updatedAt: number;
}

export interface Duty {
  id: string;
  name: string;
  departmentId: string;
  createdAt: number;
  updatedAt: number;
}

export interface Department {
  id: string;
  name: string;
  civilGuards: CivilGuard[];
  duties: Duty[];
  createdAt: number;
  updatedAt: number;
}

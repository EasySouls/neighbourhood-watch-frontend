export interface SessionResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export interface Session {
  user: User;
  accessToken: string;
}

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
  depHeadId: string;
  duties: Duty[];
  createdAt: number;
  updatedAt: number;
}

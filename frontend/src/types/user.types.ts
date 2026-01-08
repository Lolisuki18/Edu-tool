export type UserRole = "admin" | "teacher" | "leader" | "member";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  groupId?: string; // For leader and member
  createdBy?: string; // ID of user who created this account
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

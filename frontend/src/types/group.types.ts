export interface Group {
  id: string;
  name: string;
  description?: string;
  leaderId?: string;
  teacherId: string; // Teacher who created this group
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface GroupState {
  groups: Group[];
  isLoading: boolean;
  createGroup: (data: CreateGroupData) => Promise<void>;
  updateGroup: (id: string, data: Partial<Group>) => Promise<void>;
  deleteGroup: (id: string) => Promise<void>;
  getGroupsByTeacher: (teacherId: string) => Group[];
}

export interface CreateGroupData {
  name: string;
  description?: string;
  teacherId: string;
  createdBy?: string; // ID of teacher or leader who created this group
  createdByRole?: "teacher" | "leader";
}

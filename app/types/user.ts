interface Role {
  id: string
  code: string | null
  name: string
}

export interface UserPayload {
  userId: string
  userCode: string
  userName: string | null
  referUserCode: string | null
  login: string
  fullName: string
  email: string
  phoneNo: string | null
  joinDate: string | null
  endDate: string | null
  endDateProbation: string | null
  roles: Role[]
  lockedFlag: boolean
  positionName: string | null
  status?: boolean
  positionCode?: string | null
  bpCode?: string | null
  plant?: string | null
  plants?: string[]
}

export interface UserResponse {
  payload: UserPayload
  status: number
  message: string
}

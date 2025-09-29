// User Types
export interface User {
  id: number
  user_type_id: number
  phone: string
  due_date: string
  status_id: number
  last_login?: string
  created_at: string
  updated_at: string
  user_type?: UserType
  status?: UserStatus
  person_details?: PersonDetails
  company_details?: CompanyDetails
  foreign_person_details?: ForeignPersonDetails
}

export interface UserType {
  id: number
  name: string
  slug: string
  created_at: string
  updated_at: string
}

export interface UserStatus {
  id: number
  name: string
  slug: string
  created_at: string
  updated_at: string
}

export interface PersonDetails {
  id: number
  user_id: number
  national_code: string
  first_name: string
  last_name: string
  father_name: string
  birth_certificate_no: string
  birthday: string
  gender_id: number
  created_at: string
  updated_at: string
  gender?: Gender
}

export interface CompanyDetails {
  id: number
  user_id: number
  national_id: string
  register_date: string
  created_at: string
  updated_at: string
}

export interface ForeignPersonDetails {
  id: number
  user_id: number
  first_name: string
  last_name: string
  foreign_code: string
  passport_code: string
  country: string
  birthday: string
  created_at: string
  updated_at: string
}

export interface Gender {
  id: number
  name: string
  slug: string
  created_at: string
  updated_at: string
}

// Role and Permission Types
export interface Role {
  id: number
  name: string
  slug: string
  description?: string
  level: number
  created_at: string
  updated_at: string
  deleted_at?: string
}

export interface Permission {
  id: number
  permission_category_id: number
  name: string
  slug: string
  description?: string
  model?: string
  created_at: string
  updated_at: string
  deleted_at?: string
  permission_category?: PermissionCategory
}

export interface PermissionCategory {
  id: number
  title: string
  name: string
  created_at: string
  updated_at: string
  deleted_at?: string
}

// ISIC Tree Types
export interface ISICNode {
  id: number
  parent_id?: number
  title_fa: string
  title_en?: string
  title_short?: string
  isic_code: string
  level: '1' | '2' | '3' | '4' | '5'
  status: 'active' | 'inactive' | 'deleted'
  created_at: string
  updated_at: string
  children?: ISICNode[]
}

// Business Types
export interface Business {
  id: number
  isic_tree_id: number
  description?: string
  keywords?: string
  keywords_ids?: string
  status_id: number
  version: number
  updated_by?: number
  update_description: string
  created_at: string
  updated_at: string
  deleted_at?: string
  isic_tree?: ISICNode
  status?: Status
}

export interface BusinessActivity {
  id: number
  business_id: number
  business_category_id: number
  title?: string
  show_diagram: boolean
  created_at: string
  updated_at: string
  business?: Business
  business_category?: BusinessCategory
}

export interface BusinessCategory {
  id: number
  title: string
  show_on_search: boolean
  created_at: string
  updated_at: string
}

// License Types
export interface LicenseBase {
  id: number
  license_code: string
  license_title: string
  status_id: number
  license_version: number
  hint?: string
  notes?: string
  created_at: string
  updated_at: string
  status?: Status
}

export interface License {
  id: number
  license_base_id: number
  license_code: string
  license_title: string
  status_id: number
  request_type_id: number
  license_version: number
  duration_time?: number
  validity_time?: number
  validity_description?: string
  duration_description?: string
  hint?: string
  notes?: string
  created_at: string
  updated_at: string
  license_base?: LicenseBase
  status?: Status
  request_type?: RequestType
}

export interface RequestType {
  id: number
  name: string
  slug: string
  created_at: string
  updated_at: string
}

// Status Types
export interface Status {
  id: number
  name: string
  slug: string
  created_at: string
  updated_at: string
}

export interface RequestStatus {
  id: number
  slug: string
  name: string
  description?: string
  created_at: string
  updated_at: string
}

// Free Zone Types
export interface FreeZone {
  id: number
  title: string
  user_id: number
  status: boolean
  icon?: string
  created_at: string
  updated_at: string
  user?: User
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  message?: string
  status: 'success' | 'error'
}

export interface PaginatedResponse<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  from: number
  to: number
}

// Dashboard Types
export interface DashboardStats {
  total_users: number
  total_businesses: number
  total_licenses: number
  total_requests: number
  pending_requests: number
  approved_requests: number
  rejected_requests: number
}

// Log Types
export interface LogEntry {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error' | 'debug'
  message: string
  context?: Record<string, any>
  user_id?: number
  request_id?: string
}

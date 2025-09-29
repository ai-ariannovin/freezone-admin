// Mock API برای تست - شبیه‌سازی Laravel Backend
export interface MockUser {
  id: number;
  name: string;
  phone: string;
  email?: string;
  user_type_id: number;
  status_id: number;
  permissions: string[];
  roles: string[];
}

export interface MockLoginResponse {
  token: string;
  user: MockUser;
}

// Mock users data (aligned with datamodel/RoleBaseTable.sql)
// Permission slugs per SQL:
// 1) view.users, 2) create.users, 3) view.roles, 4) edit.permissions,
// 5) view.licenses, 6) request.license, 7) manage.freezones, 8) link.business.freezone
const mockUsers: MockUser[] = [
  {
    id: 1,
    name: 'مدیر سیستم',
    phone: '09123456789',
    email: 'admin@freezone.ir',
    user_type_id: 1,
    status_id: 1,
    permissions: [
      'view.users',
      'create.users',
      'view.roles',
      'edit.permissions',
      'view.licenses',
      'request.license',
      'manage.freezones',
      'link.business.freezone',
    ],
    roles: ['admin']
  },
  {
    id: 2,
    name: 'کاربر حقیقی',
    phone: '09123456788',
    email: 'person@freezone.ir',
    user_type_id: 1,
    status_id: 1,
    permissions: [
      // RoleBaseTable.sql maps permission_id 6 (request.license) to role_id 2 (personuser)
      'request.license'
    ],
    roles: ['personuser']
  },
  {
    id: 3,
    name: 'کاربر حقوقی',
    phone: '09123456787',
    email: 'company@freezone.ir',
    user_type_id: 2,
    status_id: 1,
    permissions: [
      // Assuming similar capability to personuser for mock usage
      'request.license',
      'view.licenses'
    ],
    roles: ['companyuser']
  },
  {
    id: 4,
    name: 'مدیر منطقه آزاد',
    phone: '09123456786',
    email: 'fzmanager@freezone.ir',
    user_type_id: 1,
    status_id: 1,
    permissions: [
      'manage.freezones',
      'link.business.freezone',
      'view.licenses'
    ],
    roles: ['freezonemanager']
  }
];

// Mock API functions
export const mockApi = {
  // شبیه‌سازی لاگین
  async login(phone: string, password: string): Promise<MockLoginResponse> {
    // شبیه‌سازی تاخیر شبکه
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // بررسی اطلاعات لاگین
    const user = mockUsers.find(u => u.phone === phone);
    
    if (!user) {
      throw new Error('کاربری با این شماره تلفن یافت نشد');
    }
    
    // برای تست، هر رمز عبوری قبول است
    if (password.length < 3) {
      throw new Error('رمز عبور باید حداقل 3 کاراکتر باشد');
    }
    
    // تولید token جعلی
    const token = `mock_token_${user.id}_${Date.now()}`;
    
    return {
      token,
      user
    };
  },

  // شبیه‌سازی دریافت اطلاعات کاربر
  async getCurrentUser(token: string): Promise<MockUser> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userId = parseInt(token.split('_')[2]);
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('کاربر یافت نشد');
    }
    
    return user;
  },

  // شبیه‌سازی لاگ‌آوت
  async logout(token: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    // در واقعیت، token را در سرور invalid می‌کنیم
  }
};

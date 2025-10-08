import { permissionSchema } from '../permission.schema'

describe('Permission Schema Validation', () => {
  describe('Valid inputs', () => {
    test('should accept valid permission data', () => {
      const validPermission = {
        name: 'مشاهده نقش‌ها',
        slug: 'view.roles',
        description: 'امکان مشاهده لیست نقش‌ها',
        permission_category_id: 1,
        model: 'Role'
      }

      const result = permissionSchema.safeParse(validPermission)
      expect(result.success).toBe(true)
    })

    test('should accept permission with level', () => {
      const permissionWithLevel = {
        name: 'ویرایش نقش‌ها',
        slug: 'edit.roles',
        description: 'امکان ویرایش نقش‌ها',
        permission_category_id: 1,
        model: 'Role',
        level: 3
      }

      const result = permissionSchema.safeParse(permissionWithLevel)
      expect(result.success).toBe(true)
    })
  })

  describe('Invalid inputs', () => {
    test('should reject missing permission_category_id', () => {
      const invalidPermission = {
        name: 'مشاهده نقش‌ها',
        slug: 'view.roles',
        model: 'Role'
        // permission_category_id مفقود
      }

      const result = permissionSchema.safeParse(invalidPermission)
      expect(result.success).toBe(false)
    })

    test('should reject invalid slug format', () => {
      const invalidPermission = {
        name: 'مشاهده نقش‌ها',
        slug: 'Invalid Slug!',
        permission_category_id: 1,
        model: 'Role'
      }

      const result = permissionSchema.safeParse(invalidPermission)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('شناسه باید با حروف کوچک، نقطه یا خط تیره باشد (مثال: view.users)')
      }
    })

    test('should reject empty model', () => {
      const invalidPermission = {
        name: 'مشاهده نقش‌ها',
        slug: 'view.roles',
        permission_category_id: 1,
        model: ''
      }

      const result = permissionSchema.safeParse(invalidPermission)
      expect(result.success).toBe(false)
    })
  })

  describe('Edge cases', () => {
    test('should handle maximum length fields', () => {
      const maxLengthPermission = {
        name: 'a'.repeat(150),
        slug: 'a'.repeat(120),
        description: 'a'.repeat(255),
        permission_category_id: 1,
        model: 'a'.repeat(100)
      }

      const result = permissionSchema.safeParse(maxLengthPermission)
      expect(result.success).toBe(true)
    })

    test('should reject fields exceeding maximum length', () => {
      const tooLongPermission = {
        name: 'a'.repeat(151), // بیش از حد مجاز
        slug: 'view.roles',
        permission_category_id: 1,
        model: 'Role'
      }

      const result = permissionSchema.safeParse(tooLongPermission)
      expect(result.success).toBe(false)
    })
  })
})


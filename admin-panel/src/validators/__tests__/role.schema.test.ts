import { roleSchema } from '../role.schema'

describe('Role Schema Validation', () => {
  describe('Valid inputs', () => {
    test('should accept valid role data', () => {
      const validRole = {
        name: 'مدیر سیستم',
        slug: 'admin',
        description: 'دسترسی کامل به سیستم',
        level: 5,
        permission_category_id: 1,
        model: 'Role'
      }

      const result = roleSchema.safeParse(validRole)
      expect(result.success).toBe(true)
    })

    test('should accept minimal valid role data', () => {
      const minimalRole = {
        name: 'کاربر',
        slug: 'user',
        level: 1
      }

      const result = roleSchema.safeParse(minimalRole)
      expect(result.success).toBe(true)
    })
  })

  describe('Invalid inputs', () => {
    test('should reject empty name', () => {
      const invalidRole = {
        name: '',
        slug: 'admin',
        level: 5
      }

      const result = roleSchema.safeParse(invalidRole)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('حداقل 2 کاراکتر لازم است')
      }
    })

    test('should reject invalid slug format', () => {
      const invalidRole = {
        name: 'مدیر',
        slug: 'Invalid Slug!',
        level: 5
      }

      const result = roleSchema.safeParse(invalidRole)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('شناسه باید با حروف کوچک، نقطه یا خط تیره باشد (مثال: view.users)')
      }
    })

    test('should reject invalid level', () => {
      const invalidRole = {
        name: 'مدیر',
        slug: 'admin',
        level: 10 // بیش از حد مجاز
      }

      const result = roleSchema.safeParse(invalidRole)
      expect(result.success).toBe(false)
    })

    test('should reject missing required fields', () => {
      const invalidRole = {
        name: 'مدیر'
        // slug و level مفقود
      }

      const result = roleSchema.safeParse(invalidRole)
      expect(result.success).toBe(false)
    })
  })

  describe('Edge cases', () => {
    test('should handle maximum length fields', () => {
      const maxLengthRole = {
        name: 'a'.repeat(150),
        slug: 'a'.repeat(100),
        description: 'a'.repeat(255),
        level: 5
      }

      const result = roleSchema.safeParse(maxLengthRole)
      expect(result.success).toBe(true)
    })

    test('should reject fields exceeding maximum length', () => {
      const tooLongRole = {
        name: 'a'.repeat(151), // بیش از حد مجاز
        slug: 'admin',
        level: 5
      }

      const result = roleSchema.safeParse(tooLongRole)
      expect(result.success).toBe(false)
    })
  })
})


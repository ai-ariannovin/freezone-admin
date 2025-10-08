import { categorySchema } from '../category.schema'

describe('Category Schema Validation', () => {
  describe('Valid inputs', () => {
    test('should accept valid category data', () => {
      const validCategory = {
        name: 'مدیریت نقش‌ها',
        description: 'دسترسی‌های مربوط به مدیریت نقش‌ها'
      }

      const result = categorySchema.safeParse(validCategory)
      expect(result.success).toBe(true)
    })

    test('should accept category with optional fields', () => {
      const categoryWithOptional = {
        name: 'مدیریت کاربران',
        description: 'دسترسی‌های مربوط به مدیریت کاربران',
        slug: 'user-management',
        level: 2,
        permission_category_id: 1,
        model: 'User'
      }

      const result = categorySchema.safeParse(categoryWithOptional)
      expect(result.success).toBe(true)
    })
  })

  describe('Invalid inputs', () => {
    test('should reject empty name', () => {
      const invalidCategory = {
        name: '',
        description: 'توضیحات'
      }

      const result = categorySchema.safeParse(invalidCategory)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('حداقل 2 کاراکتر لازم است')
      }
    })

    test('should reject empty description', () => {
      const invalidCategory = {
        name: 'نام گروه',
        description: ''
      }

      const result = categorySchema.safeParse(invalidCategory)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('حداقل 2 کاراکتر لازم است')
      }
    })

    test('should reject missing required fields', () => {
      const invalidCategory = {
        name: 'نام گروه'
        // description مفقود
      }

      const result = categorySchema.safeParse(invalidCategory)
      expect(result.success).toBe(false)
    })
  })

  describe('Edge cases', () => {
    test('should handle maximum length fields', () => {
      const maxLengthCategory = {
        name: 'a'.repeat(150),
        description: 'a'.repeat(150)
      }

      const result = categorySchema.safeParse(maxLengthCategory)
      expect(result.success).toBe(true)
    })

    test('should reject fields exceeding maximum length', () => {
      const tooLongCategory = {
        name: 'a'.repeat(151), // بیش از حد مجاز
        description: 'توضیحات'
      }

      const result = categorySchema.safeParse(tooLongCategory)
      expect(result.success).toBe(false)
    })
  })
})


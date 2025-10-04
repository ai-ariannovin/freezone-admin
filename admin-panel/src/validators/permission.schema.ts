import { z } from 'zod'
import { faMessages, slugRegex } from './faValidation'

export const permissionSchema = z.object({
  name: z.string().min(2, faMessages.minLength(2)).max(150, faMessages.maxLength(150)),
  slug: z.string().min(2, faMessages.minLength(2)).max(120, faMessages.maxLength(120)).regex(slugRegex, faMessages.invalidSlug),
  description: z.string().max(255, faMessages.maxLength(255)).optional().or(z.literal('')),
  permission_category_id: z.coerce.number().int(),
  model: z.string().min(2, faMessages.minLength(2)).max(100, faMessages.maxLength(100)),
  level: z.number().optional(),
})

export type PermissionInput = z.infer<typeof permissionSchema>



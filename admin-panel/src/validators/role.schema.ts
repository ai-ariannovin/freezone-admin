import { z } from 'zod'
import { faMessages, slugRegex } from './faValidation'

export const roleSchema = z.object({
  name: z.string().min(2, faMessages.minLength(2)).max(150, faMessages.maxLength(150)),
  slug: z.string().min(2, faMessages.minLength(2)).max(100, faMessages.maxLength(100)).regex(slugRegex, faMessages.invalidSlug),
  description: z.string().max(255, faMessages.maxLength(255)).optional().or(z.literal('')),
  level: z.number({ required_error: faMessages.required }).min(1).max(5),
  permission_category_id: z.number().optional(),
  model: z.string().optional(),
})

export type RoleInput = z.infer<typeof roleSchema>





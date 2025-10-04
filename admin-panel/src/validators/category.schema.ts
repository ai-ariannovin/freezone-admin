import { z } from 'zod'
import { faMessages } from './faValidation'

export const categorySchema = z.object({
  name: z.string().min(2, faMessages.minLength(2)).max(150, faMessages.maxLength(150)),
  description: z.string().min(2, faMessages.minLength(2)).max(150, faMessages.maxLength(150)),
  slug: z.string().optional(),
  level: z.number().optional(),
  permission_category_id: z.number().optional(),
  model: z.string().optional(),
})

export type CategoryInput = z.infer<typeof categorySchema>





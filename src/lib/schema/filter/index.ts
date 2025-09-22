import { z } from "zod"

export const filterSchema = z.object({
  minAge: z.number().optional().nullable(),
  maxAge: z.number().optional().nullable(),
  minHeight: z.number().optional().nullable(),
  maxHeight: z.number().optional().nullable(),
  city: z.string().optional(),
  region: z.string().optional(),
  gender: z.string().optional(),
})

export type FilterFormSchema = z.infer<typeof filterSchema>

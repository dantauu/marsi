import { z } from "zod"

export const editSchema = z.object({
  photo_url: z.array(z.string()),
  first_name: z.string(),
  age: z
    .number({
      required_error: "Введите возраст",
      invalid_type_error: "Возраст должен быть числом",
    })
    .int("Возраст должен быть целым числом")
    .min(16, "Возраст должен быть не меньше 16")
    .max(100, "Возраст должен быть не больше 100")
    .nullable(),
  gender: z.string().optional(),
  city: z.string().optional(),
  about_me: z.string().optional().nullable(),
  height: z
    .string()
    .refine(
      (val) => {
        if (!val) return true
        const num = Number(val)
        return !isNaN(num) && num >= 120 && num <= 230
      },
      (val) => {
        if (!val) return { message: "" }
        const num = Number(val)
        if (isNaN(num)) return { message: "Рост должен быть числом" }
        if (num < 120) return { message: "Минимальная высота 120" }
        return { message: "Максимальная высота 230" }
      }
    )
    .optional()
    .nullable(),
  goal: z.string().optional(),
  hobbies: z.array(z.string()).optional(),
  deleted_photos: z.array(z.string()).optional(),
})

export type EditFormSchema = z.infer<typeof editSchema>

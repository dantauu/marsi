import type { useNotify } from "@/shared/lib/hooks/use-notify.tsx"

export function showFormErrors(
  errors: Record<string, any>,
  notify: ReturnType<typeof useNotify>["notify"]
) {
  const flattenErrors: string[] = []

  const traverse = (obj: any) => {
    if (!obj) return

    if (Array.isArray(obj)) {
      obj.forEach(traverse)
      return
    }

    if (typeof obj === "object") {
      if (obj.message && typeof obj.message === "string") {
        flattenErrors.push(obj.message)
      }
      Object.values(obj).forEach(traverse)
    }
  }

  traverse(errors)

  flattenErrors.forEach((msg) =>
    notify({ message: msg, className: "text-red-500" })
  )
}

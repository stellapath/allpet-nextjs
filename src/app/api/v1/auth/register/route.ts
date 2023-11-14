import { Regex } from "@/constant"
import UserService from "@/service/user-service"
import { z } from "zod"

const schema = z.object({
  phone: z.string().regex(Regex.phone),
  userId: z.string(),
  name: z.string(),
  password: z.string(),
})

export const POST = async (request: Request) => {
  const json = await request.json()
  try {
    const params = schema.parse(json)
    const user = await UserService.createWithPhone(params)
    return Response.json({ success: true, user })
  } catch (e) {
    let error = new Error("unknown")
    if (e instanceof z.ZodError) {
      error = new Error(e.errors[0].message)
    }
    return Response.json({ success: false, error })
  }
}

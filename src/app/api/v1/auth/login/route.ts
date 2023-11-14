import { ValidationMessage } from "@/constant"
import UserService from "@/service/user-service"
import { ZodError, z } from "zod"
import jwt from "jsonwebtoken"

const schema = z.object({
  userId: z.string(),
  password: z.string().min(6, ValidationMessage.invalidPassword),
})

export const POST = async (request: Request) => {
  const json = await request.json()
  try {
    const params = schema.parse(json)
    const user = await UserService.findByUserIdAndPassword(
      params.userId,
      params.password
    )
    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    })
    return Response.json({ success: true, accessToken })
  } catch (e) {
    console.log(e)
    if (e instanceof ZodError) {
      return Response.json({ success: false, error: e.errors[0].message })
    }
    return Response.json({ success: false })
  }
}

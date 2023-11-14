import CryptoUtil from "@/util/crypto-util"
import { PrismaClient, SNSType, User } from "@prisma/client"

const client = new PrismaClient()

const createWithPhone = async (dto: {
  phone: string
  name: string
  userId: string
  password: string
}): Promise<User> => {
  const hashedPassword = await CryptoUtil.hash(dto.password)
  const account = await client.account.create({
    data: {
      userId: dto.userId,
      hashedPassword,
    },
  })
  return client.user.create({
    data: {
      name: dto.name,
      phone: dto.phone,
      account: {
        connect: {
          id: account.id,
        },
      },
    },
  })
}

const createWithSNS = async (dto: {
  phone: string
  name: string
  snsId: string
  snsType: SNSType
}): Promise<User> => {
  const account = await client.account.create({
    data: {
      snsId: dto.snsId,
      snsType: dto.snsType,
    },
  })
  return client.user.create({
    data: {
      name: dto.name,
      phone: dto.phone,
      account: {
        connect: {
          id: account.id,
        },
      },
    },
  })
}

const findByUserIdAndPassword = async (
  userId: string,
  password: string
): Promise<User> => {
  const account = await client.account.findUniqueOrThrow({
    where: {
      userId,
    },
  })

  const hashedPassword = account.hashedPassword
  if (!hashedPassword) {
    throw Error("No password")
  }

  if (!(await CryptoUtil.compare(password, hashedPassword))) {
    throw Error("Invalid password")
  }

  return client.user.findUniqueOrThrow({
    where: {
      accountId: account.id,
    },
  })
}

const findByPhoneNumber = async (phoneNumber: string): Promise<User> => {
  return client.user.findUniqueOrThrow({
    where: {
      phone: phoneNumber,
    },
  })
}

const UserService = {
  createWithPhone,
  createWithSNS,
  findByUserIdAndPassword,
  findByPhoneNumber,
}

export default UserService

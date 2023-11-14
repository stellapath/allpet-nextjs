import bcrypt from "bcrypt"

const saltRounds = 10

const hash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds)
  return await bcrypt.hash(password, salt)
}

const compare = async (unhashed: string, hashed: string): Promise<boolean> => {
  return await bcrypt.compare(unhashed, hashed)
}

const CryptoUtil = {
  hash,
  compare,
}

export default CryptoUtil

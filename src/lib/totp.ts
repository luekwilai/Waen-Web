import crypto from "crypto"

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
const TOTP_PERIOD = 30
const TOTP_DIGITS = 6

function base32Encode(buffer: Buffer) {
  let bits = 0
  let value = 0
  let output = ""

  for (const byte of buffer) {
    value = (value << 8) | byte
    bits += 8

    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
  }

  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 31]
  }

  return output
}

function base32Decode(input: string) {
  const normalized = input.toUpperCase().replace(/=+$/, "")
  let bits = 0
  let value = 0
  const bytes: number[] = []

  for (const char of normalized) {
    const index = BASE32_ALPHABET.indexOf(char)
    if (index === -1) {
      continue
    }

    value = (value << 5) | index
    bits += 5

    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 255)
      bits -= 8
    }
  }

  return Buffer.from(bytes)
}

function generateCode(secret: string, counter: number) {
  const key = base32Decode(secret)
  const buffer = Buffer.alloc(8)
  buffer.writeBigUInt64BE(BigInt(counter))

  const hmac = crypto.createHmac("sha1", key).update(buffer).digest()
  const offset = hmac[hmac.length - 1] & 0x0f
  const binary =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff)

  return String(binary % 10 ** TOTP_DIGITS).padStart(TOTP_DIGITS, "0")
}

export function generateTotpSecret() {
  return base32Encode(crypto.randomBytes(20))
}

export function generateOtpAuthUrl({
  issuer,
  accountName,
  secret,
}: {
  issuer: string
  accountName: string
  secret: string
}) {
  const label = encodeURIComponent(`${issuer}:${accountName}`)
  const issuerParam = encodeURIComponent(issuer)
  return `otpauth://totp/${label}?secret=${secret}&issuer=${issuerParam}&algorithm=SHA1&digits=${TOTP_DIGITS}&period=${TOTP_PERIOD}`
}

export function verifyTotpToken({
  token,
  secret,
  window = 1,
}: {
  token: string
  secret: string
  window?: number
}) {
  const normalizedToken = token.replace(/\s+/g, "")

  if (!/^\d{6}$/.test(normalizedToken)) {
    return false
  }

  const currentCounter = Math.floor(Date.now() / 1000 / TOTP_PERIOD)

  for (let offset = -window; offset <= window; offset += 1) {
    if (generateCode(secret, currentCounter + offset) === normalizedToken) {
      return true
    }
  }

  return false
}

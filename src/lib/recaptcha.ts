export async function verifyRecaptchaToken(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY

  if (!secret) {
    // reCAPTCHA not configured → skip verification. The client only renders the widget
    // when NEXT_PUBLIC_RECAPTCHA_SITE_KEY is set, so enforcing here (fail-closed) when the
    // secret is missing would lock users out with no way to produce a token. Verification
    // is enforced only when the secret IS configured (the branch below).
    return true
  }

  if (!token) {
    return false
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  })

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  })

  if (!response.ok) {
    return false
  }

  const result = (await response.json()) as { success?: boolean }
  return Boolean(result.success)
}

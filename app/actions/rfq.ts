'use server'

import { createClient } from '@supabase/supabase-js'
import { createSupabaseCaptchaContextFromEnv, verifyCaptchaSubmission } from '@/lib/inquiry-captcha'
import { validateRfq, type RfqState } from '@/lib/rfq'

export async function submitRfq(_previous: RfqState, formData: FormData): Promise<RfqState> {
  const fieldErrors = validateRfq(formData)
  if (Object.keys(fieldErrors).length > 0) {
    return { status: 'error', message: 'Please correct the highlighted fields.', fieldErrors }
  }

  const env = process.env
  const secret = env.CAPTCHA_SECRET?.trim()
  if (!secret) return { status: 'error', message: 'Verification is temporarily unavailable. Please try again later.' }

  const captcha = await verifyCaptchaSubmission({
    secret,
    scope: String(formData.get('captchaScope') ?? ''),
    token: String(formData.get('captchaToken') ?? ''),
    answer: String(formData.get('captchaAnswer') ?? ''),
    ...createSupabaseCaptchaContextFromEnv(env),
  })
  if (!captcha.ok) {
    return { status: 'error', message: 'The verification code is invalid or expired. Refresh the image and try again.' }
  }

  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  const tenantId = env.NEXT_PUBLIC_TENANT_ID?.trim()
  if (!supabaseUrl || !serviceRoleKey || !tenantId) {
    return { status: 'error', message: 'The inquiry service is temporarily unavailable. Please try again later.' }
  }

  const get = (key: string) => String(formData.get(key) ?? '').trim()
  const details = [
    get('product') && `Product: ${get('product')}`,
    get('application') && `Application / material: ${get('application')}`,
    get('capacity') && `Desired capacity / output: ${get('capacity')}`,
    get('quantity') && `Quantity: ${get('quantity')}`,
    get('productSlug') && `Product slug: ${get('productSlug')}`,
    '',
    get('message'),
  ].filter((value): value is string => typeof value === 'string').join('\n')

  const db = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } })
  const { error } = await db.from('inquiries').insert({
    tenant_id: tenantId,
    name: get('name'),
    email: get('email'),
    phone: get('phone') || null,
    company: get('company') || null,
    subject: get('product'),
    message: details,
    status: 'new',
  })
  if (error) {
    return { status: 'error', message: 'Your inquiry could not be sent. Please try again or email info@xingyangglobal.com.' }
  }
  return { status: 'success', message: 'Thank you. Your inquiry has been recorded and our team will review your requirements.' }
}

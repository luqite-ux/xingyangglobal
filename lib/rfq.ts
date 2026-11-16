export type RfqFieldName =
  | 'name'
  | 'email'
  | 'phone'
  | 'company'
  | 'product'
  | 'application'
  | 'capacity'
  | 'quantity'
  | 'message'

export type RfqState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string; fieldErrors?: Partial<Record<RfqFieldName, string>> }

export const initialRfqState: RfqState = { status: 'idle' }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateRfq(data: FormData): Partial<Record<RfqFieldName, string>> {
  const get = (key: RfqFieldName) => String(data.get(key) ?? '').trim()
  const errors: Partial<Record<RfqFieldName, string>> = {}

  if (get('name').length < 2) errors.name = 'Enter your name.'
  if (!emailPattern.test(get('email'))) errors.email = 'Enter a valid email address.'
  if (!get('product')) errors.product = 'Choose a product or category.'
  if (get('message').length < 10) errors.message = 'Add a short description of your material and task.'
  return errors
}

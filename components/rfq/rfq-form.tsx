'use client'

import { useActionState, useId } from 'react'
import { AlertCircle, CheckCircle2, Package } from 'lucide-react'
import { submitRfq } from '@/app/actions/rfq'
import { initialRfqState, type RfqFieldName } from '@/lib/rfq'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Spinner } from '@/components/ui/spinner'
import { InquiryCaptchaField } from '@/components/inquiry-captcha-field'
import { cn } from '@/lib/utils'

type RfqFormProps = {
  productOptions: string[]
  defaultProduct?: string
  /** Set on product detail pages so the inquiry visibly carries its context. */
  productContext?: { name: string; slug: string }
  defaultMessage?: string
  className?: string
}

const controlClass =
  'h-11 w-full border border-input bg-paper px-3 text-base text-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember aria-invalid:border-destructive'

export function RfqForm({ productOptions, defaultProduct, productContext, defaultMessage, className }: RfqFormProps) {
  const id = useId()
  const [state, action, pending] = useActionState(submitRfq, initialRfqState)
  const errors = state.status === 'error' ? (state.fieldErrors ?? {}) : {}
  const err = (name: RfqFieldName) => errors[name]

  if (state.status === 'success') {
    return (
      <div role="status" className="flex gap-4 border border-mineral/40 bg-paper-deep p-6">
        <CheckCircle2 className="size-6 shrink-0 text-mineral" aria-hidden="true" />
        <div>
          <p className="font-display text-lg font-semibold text-ink">Inquiry received</p>
          <p className="mt-1 text-muted-foreground">{state.message}</p>
        </div>
      </div>
    )
  }

  return (
    <form action={action} noValidate className={cn('grid gap-6', className)} aria-busy={pending}>
      {productContext ? (
        <div className="flex items-start gap-3 border-l-2 border-ember bg-paper-deep p-4">
          <Package className="mt-0.5 size-5 shrink-0 text-mineral" aria-hidden="true" />
          <div>
            <p className="eyebrow !text-[0.68rem]">Inquiry about</p>
            <p className="font-display font-semibold text-ink">{productContext.name}</p>
            <input type="hidden" name="productSlug" value={productContext.slug} />
          </div>
        </div>
      ) : null}

      <FieldGroup className="grid gap-5 md:grid-cols-2">
        <Field data-invalid={err('name') ? true : undefined}>
          <FieldLabel htmlFor={`${id}-name`}>Name</FieldLabel>
          <Input id={`${id}-name`} name="name" autoComplete="name" required aria-invalid={!!err('name')} className="h-11" />
          {err('name') ? <FieldError>{err('name')}</FieldError> : null}
        </Field>
        <Field data-invalid={err('email') ? true : undefined}>
          <FieldLabel htmlFor={`${id}-email`}>Email</FieldLabel>
          <Input id={`${id}-email`} name="email" type="email" autoComplete="email" required aria-invalid={!!err('email')} className="h-11" />
          {err('email') ? <FieldError>{err('email')}</FieldError> : null}
        </Field>
        <Field>
          <FieldLabel htmlFor={`${id}-phone`}>Phone / WhatsApp (optional)</FieldLabel>
          <Input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className="h-11" />
        </Field>
        <Field>
          <FieldLabel htmlFor={`${id}-company`}>Company (optional)</FieldLabel>
          <Input id={`${id}-company`} name="company" autoComplete="organization" className="h-11" />
        </Field>
        <Field data-invalid={err('product') ? true : undefined}>
          <FieldLabel htmlFor={`${id}-product`}>Product / category</FieldLabel>
          <select
            id={`${id}-product`}
            name="product"
            required
            defaultValue={defaultProduct ?? ''}
            aria-invalid={!!err('product')}
            className={controlClass}
          >
            <option value="" disabled>
              Select a product or category
            </option>
            {productOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
          {err('product') ? <FieldError>{err('product')}</FieldError> : null}
        </Field>
        <Field>
          <FieldLabel htmlFor={`${id}-application`}>Application / material</FieldLabel>
          <Input id={`${id}-application`} name="application" placeholder="e.g. dry straw, wood offcuts" className="h-11" />
        </Field>
        <Field>
          <FieldLabel htmlFor={`${id}-capacity`}>Desired capacity / output</FieldLabel>
          <Input id={`${id}-capacity`} name="capacity" placeholder="e.g. 500 kg per hour" className="h-11" />
        </Field>
        <Field>
          <FieldLabel htmlFor={`${id}-quantity`}>Quantity</FieldLabel>
          <Input id={`${id}-quantity`} name="quantity" inputMode="numeric" defaultValue="1" className="h-11" />
          <FieldDescription>Minimum order is one machine.</FieldDescription>
        </Field>
      </FieldGroup>

      <Field data-invalid={err('message') ? true : undefined}>
        <FieldLabel htmlFor={`${id}-message`}>Message</FieldLabel>
        <Textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          required
          defaultValue={defaultMessage}
          aria-invalid={!!err('message')}
          placeholder="Describe the material, target fineness or batch size, and your voltage."
        />
        {err('message') ? <FieldError>{err('message')}</FieldError> : null}
      </Field>

      <InquiryCaptchaField className="text-ink" />

      {state.status === 'error' ? (
        <div role="alert" className="flex gap-3 border border-destructive/50 bg-destructive/5 p-4 text-sm text-ink">
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
          {state.message}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 items-center justify-center gap-2 border border-ink bg-ink px-6 font-display text-sm font-semibold text-paper transition-colors hover:border-mineral hover:bg-mineral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? <Spinner className="size-4" /> : null}
          {pending ? 'Sending…' : 'Send inquiry'}
        </button>
        <p className="text-sm text-muted-foreground">No prices are shown online. We reply with a model suggestion to review.</p>
      </div>
    </form>
  )
}

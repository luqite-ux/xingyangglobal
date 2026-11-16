import Image from 'next/image'
import type { ProductImage } from '@/lib/products'
import { cn } from '@/lib/utils'

type ProductVisualProps = {
  image: ProductImage
  sizes: string
  priority?: boolean
  className?: string
  imageClassName?: string
}

/** Complete-subject stage: image is contained, never cropped, and blends into the surrounding surface. */
export function ProductVisual({ image, sizes, priority, className, imageClassName }: ProductVisualProps) {
  return (
    <div className={cn('relative aspect-square w-full', className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={85}
        className={cn('product-image object-contain p-3', imageClassName)}
      />
    </div>
  )
}

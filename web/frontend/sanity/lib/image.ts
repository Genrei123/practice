import createImageUrlBuilder from '@sanity/image-url'
import {dataset, projectId} from './api'

const builder = createImageUrlBuilder({projectId, dataset})

export const urlFor = (source: any) => {
  return builder.image(source)
}

// Placeholder image for when no image is provided
export const PLACEHOLDER_IMAGE = '/images/placeholder-food.svg'

/**
 * Safe image URL builder with fallback
 * Returns the Sanity image URL or a placeholder if no image is provided
 */
export const getImageUrl = (
  source: any,
  options?: {width?: number; height?: number}
): string => {
  if (!source) return PLACEHOLDER_IMAGE

  try {
    let imageBuilder = builder.image(source)
    if (options?.width) imageBuilder = imageBuilder.width(options.width)
    if (options?.height) imageBuilder = imageBuilder.height(options.height)
    return imageBuilder.url()
  } catch {
    return PLACEHOLDER_IMAGE
  }
}

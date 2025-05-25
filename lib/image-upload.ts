export interface UploadedImage {
  id: string
  file: File
  url: string
  name: string
  size: number
}

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
export const MAX_IMAGES = 5

export function validateImageFile(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return "Please upload a valid image file (JPEG, PNG, or WebP)"
  }

  if (file.size > MAX_FILE_SIZE) {
    return "Image size must be less than 5MB"
  }

  return null
}

export function createImagePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string)
      } else {
        reject(new Error("Failed to read file"))
      }
    }
    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsDataURL(file)
  })
}

export function generateImageId(): string {
  return `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export async function processImageUpload(file: File): Promise<UploadedImage> {
  const validation = validateImageFile(file)
  if (validation) {
    throw new Error(validation)
  }

  const id = generateImageId()
  const url = await createImagePreview(file)

  return {
    id,
    file,
    url,
    name: file.name,
    size: file.size,
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

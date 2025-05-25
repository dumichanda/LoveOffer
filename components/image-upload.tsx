"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Upload, X, ImageIcon, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { processImageUpload, formatFileSize, MAX_IMAGES, type UploadedImage } from "@/lib/image-upload"

interface ImageUploadProps {
  images: UploadedImage[]
  urlImages: string[]
  onImagesChange: (images: UploadedImage[]) => void
  onUrlImagesChange: (urls: string[]) => void
  error?: string
  maxImages?: number
}

export function ImageUpload({
  images,
  urlImages,
  onImagesChange,
  onUrlImagesChange,
  error,
  maxImages = MAX_IMAGES,
}: ImageUploadProps) {
  const [uploadError, setUploadError] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const totalImages = images.length + urlImages.length

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    setIsUploading(true)
    setUploadError("")

    try {
      const newImages: UploadedImage[] = []

      for (const file of files) {
        if (totalImages + newImages.length >= maxImages) {
          setUploadError(`Maximum ${maxImages} images allowed`)
          break
        }

        try {
          const uploadedImage = await processImageUpload(file)
          newImages.push(uploadedImage)
        } catch (err) {
          setUploadError(err instanceof Error ? err.message : "Failed to process image")
          break
        }
      }

      if (newImages.length > 0) {
        onImagesChange([...images, ...newImages])
      }
    } catch (err) {
      setUploadError("Failed to upload images")
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const removeImage = (id: string) => {
    onImagesChange(images.filter((img) => img.id !== id))
    setUploadError("")
  }

  const addUrlImage = () => {
    if (totalImages < maxImages) {
      onUrlImagesChange([...urlImages, ""])
    }
  }

  const updateUrlImage = (index: number, url: string) => {
    const newUrls = [...urlImages]
    newUrls[index] = url
    onUrlImagesChange(newUrls)
  }

  const removeUrlImage = (index: number) => {
    onUrlImagesChange(urlImages.filter((_, i) => i !== index))
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <Label className="text-gray-900 dark:text-gray-100">Offer Images (max {maxImages}) *</Label>

      {/* Error Display */}
      {(error || uploadError) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || uploadError}</AlertDescription>
        </Alert>
      )}

      {/* Upload Button */}
      {totalImages < maxImages && (
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            onClick={triggerFileInput}
            disabled={isUploading}
            className="w-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-red-500 dark:hover:border-red-500 p-6 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500"
          >
            <Upload className="w-6 h-6 mr-2" />
            {isUploading ? "Uploading..." : "Upload Images from Device"}
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="text-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={addUrlImage}
            className="w-full rounded-full text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-950"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Add Image URL
          </Button>
        </div>
      )}

      {/* Uploaded Images Preview */}
      {images.length > 0 && (
        <div className="space-y-3">
          <Label className="text-sm text-gray-700 dark:text-gray-300">Uploaded Images</Label>
          <div className="grid grid-cols-2 gap-3">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img src={image.url || "/placeholder.svg"} alt={image.name} className="w-full h-full object-cover" />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeImage(image.id)}
                  className="absolute top-2 right-2 w-6 h-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </Button>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate">
                  {image.name} ({formatFileSize(image.size)})
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* URL Images */}
      {urlImages.length > 0 && (
        <div className="space-y-3">
          <Label className="text-sm text-gray-700 dark:text-gray-300">Image URLs</Label>
          {urlImages.map((url, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => updateUrlImage(index, e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="rounded-full flex-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeUrlImage(index)}
                className="px-3 text-red-500 border-red-500"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Image Count Info */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {totalImages} of {maxImages} images added
      </div>
    </div>
  )
}

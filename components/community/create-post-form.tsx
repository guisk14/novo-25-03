"use client"

import { useState, useRef } from "react"
import { ImagePlus, MapPin, X, Loader2 } from "lucide-react"
import { createPost } from "@/app/comunidade/actions"
import { BEACH_DATA } from "@/lib/beach-data"
import Image from "next/image"

interface CreatePostFormProps {
  onPostCreated?: () => void
}

// Flatten beaches for selection
const allBeaches = BEACH_DATA.flatMap((city) =>
  city.beaches.map((beach) => ({
    id: beach.id,
    name: beach.name,
    cityName: city.cityName,
    fullName: `${beach.name}, ${city.cityName}`,
  }))
)

export function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
  const [content, setContent] = useState("")
  const [selectedBeach, setSelectedBeach] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showBeachSelect, setShowBeachSelect] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Imagem muito grande. Maximo 5MB.")
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || isSubmitting) return

    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("content", content.trim())
    if (selectedBeach) {
      formData.append("beach_name", selectedBeach)
    }
    if (imageFile) {
      formData.append("image", imageFile)
    }

    const result = await createPost(formData)

    if (result.success) {
      setContent("")
      setSelectedBeach("")
      removeImage()
      onPostCreated?.()
    } else {
      alert(result.error || "Erro ao criar post")
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card/50 backdrop-blur-sm rounded-xl border border-border p-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Compartilhe sua sessao de surf..."
        className="w-full bg-transparent text-foreground placeholder:text-muted-foreground resize-none focus:outline-none text-sm min-h-[80px]"
        maxLength={500}
      />

      {/* Image Preview */}
      {imagePreview && (
        <div className="relative mt-3 rounded-lg overflow-hidden">
          <Image
            src={imagePreview}
            alt="Preview"
            width={400}
            height={300}
            className="w-full max-h-64 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full hover:bg-black/80 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

      {/* Selected Beach */}
      {selectedBeach && (
        <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-primary/10 rounded-lg w-fit">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary">{selectedBeach}</span>
          <button
            type="button"
            onClick={() => setSelectedBeach("")}
            className="ml-1 hover:text-primary/80"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Beach Selector Dropdown */}
      {showBeachSelect && (
        <div className="mt-3 max-h-48 overflow-y-auto bg-popover border border-border rounded-lg">
          {allBeaches.map((beach) => (
            <button
              key={beach.id}
              type="button"
              onClick={() => {
                setSelectedBeach(beach.fullName)
                setShowBeachSelect(false)
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors"
            >
              <span className="font-medium">{beach.name}</span>
              <span className="text-muted-foreground ml-2">{beach.cityName}</span>
            </button>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-primary"
            title="Adicionar foto"
          >
            <ImagePlus className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setShowBeachSelect(!showBeachSelect)}
            className={`p-2 rounded-lg hover:bg-secondary transition-colors ${
              showBeachSelect ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary"
            }`}
            title="Marcar local"
          >
            <MapPin className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">{content.length}/500</span>
          <button
            type="submit"
            disabled={!content.trim() || isSubmitting}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Publicar
          </button>
        </div>
      </div>
    </form>
  )
}

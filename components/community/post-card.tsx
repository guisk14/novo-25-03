"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, MapPin, MoreHorizontal, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { toggleLike, deletePost } from "@/app/comunidade/actions"
import Image from "next/image"

interface PostCardProps {
  post: {
    id: string
    content: string
    image_url: string | null
    beach_name: string | null
    likes_count: number
    comments_count: number
    created_at: string
    user_id: string
    profiles: {
      username: string | null
      full_name: string | null
      avatar_url: string | null
    } | null
  }
  currentUserId: string | null
  userLiked: boolean
  onPostDeleted?: () => void
}

export function PostCard({ post, currentUserId, userLiked, onPostDeleted }: PostCardProps) {
  const [liked, setLiked] = useState(userLiked)
  const [likesCount, setLikesCount] = useState(post.likes_count)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const isOwner = currentUserId === post.user_id

  const handleLike = async () => {
    if (!currentUserId) return

    // Optimistic update
    setLiked(!liked)
    setLikesCount(liked ? likesCount - 1 : likesCount + 1)

    const result = await toggleLike(post.id)
    if (!result.success) {
      // Revert on error
      setLiked(liked)
      setLikesCount(likesCount)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este post?")) return

    setIsDeleting(true)
    const result = await deletePost(post.id)
    if (result.success) {
      onPostDeleted?.()
    } else {
      setIsDeleting(false)
      alert("Erro ao excluir post")
    }
  }

  const displayName = post.profiles?.full_name || post.profiles?.username || "Usuario"
  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ptBR })

  return (
    <div className={`bg-card/50 backdrop-blur-sm rounded-xl border border-border p-4 transition-opacity ${isDeleting ? "opacity-50" : ""}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
            {post.profiles?.avatar_url ? (
              <Image
                src={post.profiles.avatar_url}
                alt={displayName}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-primary font-bold text-sm">
                {displayName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">{displayName}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{timeAgo}</span>
              {post.beach_name && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {post.beach_name}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {isOwner && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
            >
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-8 bg-popover border border-border rounded-lg shadow-lg py-1 z-10">
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-secondary w-full"
                >
                  <Trash2 className="w-4 h-4" />
                  Excluir
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <p className="text-foreground text-sm mb-3 whitespace-pre-wrap">{post.content}</p>

      {/* Image */}
      {post.image_url && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3 bg-secondary">
          <Image
            src={post.image_url}
            alt="Post image"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-3 border-t border-border">
        <button
          onClick={handleLike}
          disabled={!currentUserId}
          className={`flex items-center gap-1.5 text-sm transition-colors ${
            liked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
          } ${!currentUserId ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
          <span>{likesCount}</span>
        </button>

        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <MessageCircle className="w-4 h-4" />
          <span>{post.comments_count}</span>
        </button>

        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors ml-auto">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

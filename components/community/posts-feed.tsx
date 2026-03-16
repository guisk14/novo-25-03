"use client"

import { useEffect, useState, useCallback } from "react"
import { PostCard } from "./post-card"
import { CreatePostForm } from "./create-post-form"
import { getPosts, getUserLikes } from "@/app/comunidade/actions"
import { Loader2 } from "lucide-react"
import Link from "next/link"

interface Post {
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

interface PostsFeedProps {
  currentUserId: string | null
}

export function PostsFeed({ currentUserId }: PostsFeedProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const loadPosts = useCallback(async (pageNum: number, append = false) => {
    const result = await getPosts(pageNum)
    if (result.success && result.data) {
      if (append) {
        setPosts((prev) => [...prev, ...result.data!])
      } else {
        setPosts(result.data)
      }
      setHasMore(result.data.length === 10)
    }
    setLoading(false)
  }, [])

  const loadUserLikes = useCallback(async () => {
    if (!currentUserId) return
    const result = await getUserLikes()
    if (result.success && result.data) {
      setUserLikes(new Set(result.data.map((like) => like.post_id)))
    }
  }, [currentUserId])

  useEffect(() => {
    loadPosts(0)
    loadUserLikes()
  }, [loadPosts, loadUserLikes])

  const handlePostCreated = () => {
    setPage(0)
    loadPosts(0)
  }

  const handlePostDeleted = () => {
    setPage(0)
    loadPosts(0)
  }

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    loadPosts(nextPage, true)
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {currentUserId ? (
        <CreatePostForm onPostCreated={handlePostCreated} />
      ) : (
        <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border p-6 text-center">
          <p className="text-muted-foreground mb-4">Faca login para compartilhar suas sessoes</p>
          <Link
            href="/auth/login"
            className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Entrar
          </Link>
        </div>
      )}

      {posts.length === 0 ? (
        <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border p-8 text-center">
          <p className="text-muted-foreground">Nenhum post ainda. Seja o primeiro a compartilhar!</p>
        </div>
      ) : (
        <>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUserId={currentUserId}
              userLiked={userLikes.has(post.id)}
              onPostDeleted={handlePostDeleted}
            />
          ))}

          {hasMore && (
            <button
              onClick={loadMore}
              className="w-full py-3 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              Carregar mais
            </button>
          )}
        </>
      )}
    </div>
  )
}

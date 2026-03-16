"use client"

import { useEffect, useState, useCallback } from "react"
import { PostCard } from "./post-card"
import { CreatePostForm } from "./create-post-form"
import { getPosts, type Post } from "@/app/comunidade/actions"
import { Loader2 } from "lucide-react"
import Link from "next/link"

interface PostsFeedProps {
  currentUserId: string | null
}

export function PostsFeed({ currentUserId }: PostsFeedProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const loadPosts = useCallback(async () => {
    try {
      const result = await getPosts()
      setPosts(result)
    } catch (error) {
      console.error("Error loading posts:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  const handlePostCreated = () => {
    loadPosts()
  }

  const handlePostDeleted = () => {
    loadPosts()
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
              userLiked={post.user_has_liked || false}
              onPostDeleted={handlePostDeleted}
            />
          ))}
        </>
      )}
    </div>
  )
}

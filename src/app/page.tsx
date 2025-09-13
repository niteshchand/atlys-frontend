"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import PostComposer from "@/components/PostComposer";
import PostCard, { Post } from "@/components/PostCard";

export default function FeedPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Dummy posts preloaded
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "demo@example.com",
      content: "Excited to explore Atlys' mission to make travel seamless 🌍✈️",
      createdAt: "Sep 8, 2025, 10:15 AM",
      emoji: <span>🌍</span>,
    },
    {
      id: 2,
      author: "test@user.com",
      content:
        "Just finished setting up my Next.js project with TailwindCSS. Loving the workflow so far 💻🚀",
      createdAt: "Sep 7, 2025, 5:42 PM",
      emoji: <span>🚀</span>,
    },
    {
      id: 3,
      author: "demo@example.com",
      content: "Happy weekend everyone! 🎉",
      createdAt: "Sep 6, 2025, 8:30 AM",
      emoji: <span>😎</span>,
    },
  ]);

  const handlePublish = (content: string) => {
    const post: Post = {
      id: Date.now(),
      author: user?.email || "Anonymous",
      content,
      createdAt: new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    };
    setPosts([post, ...posts]); // prepend new post
  };
  console.log(posts);
  return (
    <div className="min-h-screen bg-white py-10 px-4">
      {/* Login Button */}
      {user?.email ? (
        <h1 className="absolute top-4 right-4 bg-500 text-black cursor-pointer py-1 px-3 rounded transition text-sm flex items-center justify-center">
          Welcome {user.email} !
        </h1>
      ) : (
        <button
          onClick={() => router.push("/signin")}
          className="absolute top-4 right-4 bg-500 text-black cursor-pointer py-1 px-3 rounded transition text-sm flex items-center justify-center"
        >
          Login{" "}
          <div>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
              />
            </svg>
          </div>
        </button>
      )}

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Composer */}
        <PostComposer
          userEmail={user?.email ?? null}
          onPublish={handlePublish}
        />

        {/* Feed */}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
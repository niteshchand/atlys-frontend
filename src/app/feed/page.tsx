"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
type Post = {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  emoji?: React.ReactNode;
};

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

  const [newPost, setNewPost] = useState("");

  const handlePublish = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      author: user?.email || "Anonymous",
      content: newPost,
      createdAt: new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    };
    setPosts([post, ...posts]); // new posts go to the top
    setNewPost("");
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <button
        onClick={() => router.push("/signin")}
        className="absolute top-4 right-4 bg-500 text-black cursor-pointer py-1 px-3 rounded  transition text-sm flex items-center justify-center"
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
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Post Composer */}
        <motion.div
          className="bg-white p-4 rounded-xl shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
              {user ? user.email.charAt(0).toUpperCase() : "?"}
            </div>

            <div className="flex-1">
              <textarea
                placeholder="What's on your mind?"
                className="w-full border border-gray-200 rounded-xl p-3 mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
                rows={3}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />

              <div className="flex items-center justify-between">
                <div className="flex gap-4 text-gray-500 text-sm">
                  <button
                    onClick={() => alert("Photo upload not implemented")}
                    className="hover:text-indigo-500 transition"
                  >
                    📷 Photo
                  </button>
                  <button
                    onClick={() => alert("Video upload not implemented")}
                    className="hover:text-indigo-500 transition"
                  >
                    🎥 Video
                  </button>
                  <button
                    onClick={() => alert("Activity not implemented")}
                    className="hover:text-indigo-500 transition"
                  >
                    🎉 Activity
                  </button>
                </div>
                <motion.button
                  onClick={handlePublish}
                  className="px-5 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Post
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Posts Feed */}
        {posts.map((post) => (
          <motion.div
            key={post.id}
            className="rounded-xl shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-2 bg-gray-100 rounded-xl">
              <div className="bg-white p-5 rounded-xl">
                <div className="flex gap-3 mb-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="h-7 text-lg mt-10 rounded-full bg-gray-100 -ml-10">
                    {post.emoji}
                  </div>
                  <div>
                    <p className="font-semibold text-black">{post.author}</p>
                    <p className="text-xs text-gray-500">{post.createdAt}</p>
                    <p className="text-gray-800">{post.content}</p>
                  </div>
                </div>
              </div>

              {/* Actions row */}
              <div className="flex gap-6 mt-4 text-gray-500 text-sm">
                <button
                  onClick={() => alert("Like not implemented")}
                  className="hover:text-indigo-500 transition"
                >
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => alert("Comment not implemented")}
                  className="hover:text-indigo-500 transition"
                >
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => alert("Share not implemented")}
                  className="hover:text-indigo-500 transition"
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-black rotate-90"
                    aria-hidden="true"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.4376 15.3703L12.3042 19.5292C11.9326 20.2537 10.8971 20.254 10.525 19.5297L4.24059 7.2971C3.81571 6.47007 4.65077 5.56156 5.51061 5.91537L18.5216 11.2692C19.2984 11.5889 19.3588 12.6658 18.6227 13.0704L14.4376 15.3703ZM14.4376 15.3703L5.09594 6.90886"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

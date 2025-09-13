"use client";

import { motion } from "framer-motion";

export interface Post {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  emoji?: React.ReactNode;
}

export default function PostCard({ post }: { post: Post }) {
  return (
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
            {post.emoji && (
              <div className="h-7 text-lg mt-10 rounded-full bg-gray-100 -ml-10">
                {post.emoji}
              </div>
            )}
            <div>
              <p className="font-semibold text-black">{post.author}</p>
              <p className="text-xs text-gray-500">{post.createdAt}</p>
              {/* <p className="text-gray-800">{post.content}</p> */}
              <div
                className="text-gray-800"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>
            </div>
          </div>
        </div>

        {/* Actions row */}
        <div className="flex gap-6 mt-4 text-gray-500 text-sm">
          <button
            onClick={() => alert("Like not implemented")}
            className="hover:text-indigo-500 transition"
          >
            {/* Like Icon */}
            <svg
              className="w-6 h-6 text-gray-800 dark:text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
              />
            </svg>
          </button>

          <button
            onClick={() => alert("Comment not implemented")}
            className="hover:text-indigo-500 transition"
          >
            {/* Comment Icon */}
            <svg
              className="w-6 h-6 text-gray-800 dark:text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
              />
            </svg>
          </button>

          <button
            onClick={() => alert("Share not implemented")}
            className="hover:text-indigo-500 transition"
          >
            {/* Share Icon */}
            <svg
              className="w-6 h-6 text-gray-800 dark:text-black rotate-90"
              aria-hidden="true"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.4376 15.3703L12.3042 19.5292C11.9326 20.2537 10.8971 20.254 10.525 19.5297L4.24059 7.2971C3.81571 6.47007 4.65077 5.56156 5.51061 5.91537L18.5216 11.2692C19.2984 11.5889 19.3588 12.6658 18.6227 13.0704L14.4376 15.3703ZM14.4376 15.3703L5.09594 6.90886"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

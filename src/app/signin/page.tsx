"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signIn(email, password); // ✅ await the promise
    if (success) {
      router.push("/");
    } else {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 right-4 bg-500 text-black cursor-pointer py-1 px-3 rounded  transition text-sm"
      >
        Back to home
      </button>
      <div className="border rounded-3xl bg-gray-100 p-3">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center bg-gray-50 border rounded-full w-10 h-10">
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
          </div>

          <h1 className="text-2xl font-bold text-black mb-4 text-lg">
            Sign in to continue
          </h1>
          <p className="text-gray-500 mb-6 text-xs">
            Sign in to access all the features on this app
          </p>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="text-sm text-black font-bold">
                Email or username
              </label>
              <input
                type="email"
                placeholder="Enter your email or username"
                className="w-full p-2 border-0 rounded-lg mt-1 bg-gray-100 text-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm text-black font-bold">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-2 border-0 rounded-lg mt-1 bg-gray-100 text-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition mt-4"
            >
              Sign In
            </button>
          </form>
        </div>
        <p className="mt-4 text-sm text-gray-600 flex items-center justify-center ">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-indigo-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

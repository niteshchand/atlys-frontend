"use client";

import { useRef, useState,useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PostComposerProps {
  userEmail?: string | null;
  onPublish: (content: string) => void;
}

export default function PostComposer({
  userEmail,
  onPublish,
}: PostComposerProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState("");
  const [format, setFormat] = useState<"p" | "h1" | "h2">("p");
const router = useRouter();



  const exec = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value);
    updateContent();
  };

 const insertEmoji = (emoji: string) => {
  if (!userEmail) {
    router.push("/signin");
    return;
  }
  exec("insertText", emoji);
};


  const updateContent = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const clearContent = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
      setContent("");
    }
  };

  // const handlePublish = () => {
  //   const plain = editorRef.current?.innerText.trim();
  //   if (!plain) return;
  //   onPublish(content);
  //   clearContent();
  // };
  const handlePublish = () => {
  if (!userEmail) {
    router.push("/signin");
    return;
  }

  const plain = editorRef.current?.innerText.trim();
  if (!plain) return;
  onPublish(content);
  clearContent();
};


  const applyFormat = (tag: "p" | "h1" | "h2") => {
    exec("formatBlock", tag);
    setFormat(tag);
  };
const insertCodeBlock = () => {
  if (!userEmail) {
    router.push("/signin");
    return;
  }

  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const codeBlock = document.createElement("pre");
  const code = document.createElement("code");

  code.textContent = selection.toString();
  codeBlock.appendChild(code);

  range.deleteContents();
  range.insertNode(codeBlock);
  updateContent();
};



  return (
    <motion.div
      className="bg-white rounded-xl shadow overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
     {/* Toolbar */}
<div className="flex items-center justify-between px-4 py-2 bg-white shadow-sm rounded-md text-gray-700 flex-wrap gap-3">
  <div className="flex items-center justify-between bg-gray-100 rounded-xl p-1">
  <select
    className="text-sm border border-gray-300 bg-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    value={format}
    onChange={(e) => applyFormat(e.target.value as "p" | "h1" | "h2")}
  >
    <option value="p">Paragraph</option>
    <option value="h1">Heading 1</option>
    <option value="h2">Heading 2</option>
  </select>

  <div className="flex gap-3 items-center flex-wrap text-lg ml-2">
    {/* Bold */}
    <button
      onClick={() => exec("bold")}
      className="px-2 py-1 rounded-xl hover:bg-indigo-100 hover:text-indigo-600 font-bold transition bg-white"
      aria-label="Bold"
      title="Bold"
    >
      B
    </button>

    {/* Italic */}
    <button
      onClick={() => exec("italic")}
      className="px-2 py-1 rounded hover:bg-indigo-100 hover:text-indigo-600 italic transition"
      aria-label="Italic"
      title="Italic"
    >
      I
    </button>

    {/* Underline */}
    <button
      onClick={() => exec("underline")}
      className="px-2 py-1 rounded hover:bg-indigo-100 hover:text-indigo-600 underline transition"
      aria-label="Underline"
      title="Underline"
    >
      U
    </button>

    {/* Bullet List */}
    <button
      onClick={() => exec("insertUnorderedList")}
      className="px-2 py-1 rounded hover:bg-indigo-100 hover:text-indigo-600 transition"
      title="Bullet List"
      aria-label="Bullet List"
    >
      • List
    </button>

    {/* Numbered List */}
    <button
      onClick={() => exec("insertOrderedList")}
      className="px-2 py-1 rounded hover:bg-indigo-100 hover:text-indigo-600 transition"
      title="Numbered List"
      aria-label="Numbered List"
    >
      1. List
    </button>

    {/* Code Block */}
    <button
      onClick={insertCodeBlock}
      className="px-2 py-1 rounded hover:bg-indigo-100 hover:text-indigo-600 text-sm transition"
      title="Insert Code"
      aria-label="Insert Code"
    >
      &lt;/&gt;
    </button>

    {/* Undo */}
    <button
      onClick={() => exec("undo")}
      className="px-2 py-1 rounded hover:bg-indigo-100 hover:text-indigo-600 transition"
      title="Undo"
      aria-label="Undo"
    >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
  <path d="M12 5v4a4 4 0 0 1-4 4H6"/>
  <polyline points="9 9 6 6 3 9"/>
</svg>

    </button>

    {/* Redo */}
    <button
      onClick={() => exec("redo")}
      className="px-2 py-1 rounded hover:bg-indigo-100 hover:text-indigo-600 transition"
      title="Redo"
      aria-label="Redo"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
  <path d="M12 5v4a4 4 0 0 0 4 4h2"/>
  <polyline points="15 9 18 6 21 9"/>
</svg>

    </button>
 </div>
 </div>
    {/* Clear */}
    <button
      onClick={clearContent}
      title="Clear"
      aria-label="Clear"
      className="p-1 rounded-md bg-pink-100 hover:bg-pink-200 transition ml-5"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 48 48"
        className="stroke-pink-600"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <rect x="17" y="10" width="14" height="4" rx="1" ry="1" />
        <line x1="14" y1="16" x2="34" y2="16" />
        <path d="M14 16 L20 36" />
        <path d="M34 16 L28 36" />
        <path d="M20 36 Q24 40 28 36" />
        <line x1="22" y1="22" x2="22" y2="30" />
        <line x1="26" y1="22" x2="26" y2="30" />
      </svg>
    </button>

    {/* Character count */}
    <span className="text-sm text-gray-400 ml-4 select-none">
      {editorRef.current?.innerText.length || 0}
    </span>
 
</div>


      {/* Editor */}
      <div className="flex gap-3">
        {/* <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
          {userEmail ? userEmail.charAt(0).toUpperCase() : "?"}
        </div> */}

        <div className="flex-1 relative w-full h-35">
          {content.length === 0 && (
            <div className="absolute top-2 left-2 text-gray-400 pointer-events-none select-none">
              ☺ How are you feeling today?
            </div>
          )}
          <div
            ref={editorRef}
            contentEditable
            className="w-full min-h-[148px] border border-gray-200 rounded p-2 outline-none text-gray-800 mb-2 whitespace-pre-wrap"
            onInput={updateContent}
            suppressContentEditableWarning
          />
          <div className="flex items-center gap-2">
            {/* <button onClick={() => insertEmoji("😊")} className="text-xl">
              😊
            </button>
            <button onClick={() => insertEmoji("🚀")} className="text-xl">
              🚀
            </button>
            <button onClick={() => insertEmoji("💡")} className="text-xl">
              💡
            </button> */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 text-gray-600">
        <div className="flex gap-4">
          <button
            onClick={() => insertEmoji("➕")}
            className="hover:text-indigo-500 text-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
            >
              <rect x="4" y="4" width="40" height="40" rx="10" fill="#f0f0f0" />
              <line
                x1="24"
                y1="16"
                x2="24"
                y2="32"
                stroke="black"
                stroke-width="2"
              />
              <line
                x1="16"
                y1="24"
                x2="32"
                y2="24"
                stroke="black"
                stroke-width="2"
              />
            </svg>
          </button>
          <button
            onClick={() => insertEmoji("🎤")}
            className="hover:text-indigo-500 text-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
            >
              <g fill="none" stroke="black" stroke-width="2">
                <rect x="18" y="8" width="12" height="20" rx="6" ry="6" />

                <line x1="24" y1="28" x2="24" y2="34" />

                <path d="M16 24c0 4.4 3.6 8 8 8s8-3.6 8-8" />
              </g>
            </svg>
          </button>
          <button
            onClick={() => insertEmoji("🌊")}
            className="hover:text-indigo-500 text-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
            >
              <g stroke="black" stroke-width="2" fill="none">
                <rect x="8" y="14" width="22" height="20" rx="4" ry="4" />

                <rect
                  x="8"
                  y="14"
                  width="22"
                  height="6"
                  fill="rgba(0,0,0,0.1)"
                  stroke="none"
                />

                <polygon points="30,18 38,14 38,34 30,30" />
              </g>
            </svg>
          </button>
        </div>
        <motion.button
          onClick={handlePublish}
          // className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-full shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            height="48"
            viewBox="0 0 48 48"
            width="48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.02 42l41.98-18-41.98-18-.02 14 30 4-30 4z"
              fill="blue"
            />
            <path d="M0 0h48v48h-48z" fill="none" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}

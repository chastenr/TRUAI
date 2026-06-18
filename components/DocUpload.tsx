"use client";

import { useRef, useState } from "react";

interface DocUploadProps {
  listingAddress?: string;
}

export default function DocUpload({ listingAddress }: DocUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (f: File) => setFile(f);

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5">
      <div className="flex items-center gap-2">
        {/* Paperclip icon */}
        <svg
          className="size-4 shrink-0 text-[#c49a3c]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.41 17.41a2 2 0 0 1-2.83-2.83l8.49-8.48" />
        </svg>
        <p className="text-sm font-semibold text-neutral-950">
          Upload Proof of Funds / Prequalification
        </p>
      </div>

      {listingAddress && (
        <p className="mt-1 text-[0.68rem] text-neutral-400">For: {listingAddress}</p>
      )}

      {/* Drop zone */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const dropped = e.dataTransfer.files[0];
          if (dropped) handleFile(dropped);
        }}
        className={`mt-3 w-full rounded-lg border-2 border-dashed px-4 py-5 text-center transition ${
          dragging
            ? "border-[#c49a3c] bg-[#c49a3c]/5"
            : "border-neutral-200 hover:border-[#c49a3c]/50"
        }`}
      >
        {file ? (
          <span className="text-sm font-medium text-[#c49a3c]">✓ {file.name}</span>
        ) : (
          <>
            <p className="text-sm text-neutral-500">Drag a file here or click to browse</p>
            <p className="mt-1 text-xs text-neutral-400">PDF, JPG, PNG — max 10 MB</p>
          </>
        )}
      </button>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />

      {file && (
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-neutral-400 truncate">Ready to submit with showing request</p>
          <button
            type="button"
            onClick={() => setFile(null)}
            className="shrink-0 text-xs text-neutral-400 underline hover:text-neutral-700"
          >
            Remove
          </button>
        </div>
      )}

      <p className="mt-3 text-[0.65rem] leading-5 text-neutral-400">
        <strong className="font-medium">Demo only.</strong> No files are stored or transmitted.
        In production, documents would be sent securely to the brokerage.
      </p>
    </div>
  );
}

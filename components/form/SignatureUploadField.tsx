"use client";

import Image from "next/image";
import React, { useRef } from "react";

interface SignatureUploadFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export const SignatureUploadField: React.FC<SignatureUploadFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  required,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran file maksimal 2MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-slate-200">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {!value ? (
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 border-gray-300 hover:bg-gray-100 transition-colors dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-slate-400"><span className="font-semibold">Klik untuk unggah</span> atau seret dan lepas</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">PNG, JPG atau WEBP (Maks. 2MB)</p>
            </div>
            <input 
              ref={fileInputRef}
              type="file" 
              name={name}
              className="hidden" 
              accept="image/png, image/jpeg, image/webp" 
              onChange={handleFileChange}
            />
          </label>
        </div>
      ) : (
        <div className="relative border rounded-lg p-4 bg-gray-50 flex flex-col items-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm text-gray-500 mb-2 dark:text-slate-400">Pratinjau Tanda Tangan:</p>
          <div className="w-48 h-32 flex items-center justify-center bg-white border border-gray-200 rounded-md overflow-hidden p-2">
            <Image
              src={value} 
              alt="Preview Tanda Tangan" 
              width={192}
              height={128}
              unoptimized
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <button 
            type="button" 
            onClick={handleRemove}
            className="mt-4 px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
          >
            Hapus & Unggah Ulang
          </button>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form } from "../types/form";
import Link from 'next/link';


export default function FormsList() {
  const router = useRouter();
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    const storedForms = JSON.parse(localStorage.getItem("forms") || "[]") || [];
    setForms(storedForms);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Forms</h1>
      {forms.length === 0 ? (
        <p className="text-gray-600">
          No forms created yet.{" "}
          <Link href="/" className="text-blue-500 hover:underline">
            Create one now
          </Link>
          .
        </p>
      ) : (
        <div className="space-y-4">
          {forms.map((form) => (
            <div
              key={form.id}
              className="p-4 border border-gray-200 rounded-md flex justify-between items-center"
            >
              <span className="text-gray-700">{form.name}</span>
              <div className="space-x-4">
                <button
                  onClick={() => router.push(`/register/${form.id}`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Register
                </button>
                <button
                  onClick={() => router.push(`/view/${form.id}`)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  View Submissions
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

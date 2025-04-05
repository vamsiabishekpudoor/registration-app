'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Form, Submission } from '../../types/form';

export default function View() {
  const params = useParams();
  const { formId } = params;
  const [form, setForm] = useState<Form | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const storedForms = JSON.parse(localStorage.getItem('forms') || '[]') || [];
    const foundForm = storedForms.find((f: Form) => f.id === formId);
    if (foundForm) setForm(foundForm);

    const storedSubmissions = JSON.parse(localStorage.getItem(`submissions_${formId}`) || '[]') || [];
    setSubmissions(storedSubmissions);
  }, [formId]);

  if (!form) return <div className="max-w-2xl mx-auto p-6 text-red-500">Form not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{form.name} Submissions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {form.fields.map(field => (
                <th
                  key={field.name}
                  className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-gray-700"
                >
                  {field.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={index}>
                {form.fields.map(field => (
                  <td key={field.name} className="px-4 py-2 border-b border-gray-200">
                    {Array.isArray(submission[field.name])
                      ? (submission[field.name] as string[]).join(', ')
                      : submission[field.name]?.toString()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
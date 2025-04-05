'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import FormField from '../../forms/FormField';
import { Form, Submission } from '../../types/form';

export default function Register() {
  const params = useParams();
  const router = useRouter();
  const { formId } = params;
  const [form, setForm] = useState<Form | null>(null);
  const [formData, setFormData] = useState<Record<string, string | string[] | boolean>>({});
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const storedForms = (typeof window !== 'undefined' && JSON.parse(localStorage.getItem('forms') || '[]')) || [];
    const foundForm = storedForms.find((f: Form) => f.id === formId);
    if (foundForm) setForm(foundForm);

    const storedSubmissions = JSON.parse(localStorage.getItem(`submissions_${formId}`) || '[]') || [];
    setSubmissions(storedSubmissions);
  }, [formId]);

  const handleChange = (name: string, value: string | string[] | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSubmissions = [...submissions, formData];
    setSubmissions(newSubmissions);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`submissions_${formId}`, JSON.stringify(newSubmissions));
    }
    alert('Submission successful! (Stored in memory)');
    setFormData({});
  };

  if (!form) return <div className="max-w-2xl mx-auto p-6 text-red-500">Form not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{form.name}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {form.fields.map(field => (
          <FormField
            key={field.name}
            field={field}
            value={
              formData[field.name] !== undefined
                ? formData[field.name]
                : field.type === 'checkbox'
                ? []
                : field.type === 'radio' || field.type === 'dropdown'
                ? ''
                : ''
            }
            onChange={handleChange}
          />
        ))}
        <div className="space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
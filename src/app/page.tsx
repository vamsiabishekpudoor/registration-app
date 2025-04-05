'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Form, FormField } from './types/form';

export default function Home() {
  const router = useRouter();
  const [formName, setFormName] = useState('');
  const [fields, setFields] = useState<FormField[]>([{ name: '', type: 'text' }]);
  const [forms, setForms] = useState<Form[]>([]);

  const addField = () => setFields([...fields, { name: '', type: 'text' }]);
  const updateField = (index: number, key: keyof FormField, value: string) => {
    const newFields = [...fields];
    if (key === 'options') {
      newFields[index][key] = value.split(',').map((opt) => opt.trim());
    } else {
      newFields[index][key] = value as any;
    }
    setFields(newFields);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formId = uuidv4();
    const newForm: Form = { id: formId, name: formName, fields: fields.filter(f => f.name) };
    setForms([...forms, newForm]);
    if (typeof window !== 'undefined') {
      localStorage.setItem('forms', JSON.stringify([...forms, newForm]));
    }
    router.push(`/register/${formId}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Registration Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Form Name:</span>
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </label>
        {fields.map((field, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-md space-y-4">
            <label className="block">
              <span className="text-gray-700">Field Name:</span>
              <input
                type="text"
                value={field.name}
                onChange={(e) => updateField(index, 'name', e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Type:</span>
              <select
                value={field.type}
                onChange={(e) => updateField(index, 'type', e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="text">Text</option>
                <option value="textarea">Textarea</option>
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
                <option value="dropdown">Dropdown</option>
              </select>
            </label>
            {(field.type === 'radio' || field.type === 'checkbox' || field.type === 'dropdown') && (
              <label className="block">
                <span className="text-gray-700">Options (comma-separated):</span>
                <input
                  type="text"
                  placeholder="e.g., Yes, No, Maybe"
                  onChange={(e) => updateField(index, 'options', e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </label>
            )}
          </div>
        ))}
        <div className="space-x-4">
          <button
            type="button"
            onClick={addField}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Field
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Create Form
          </button>
        </div>
      </form>
    </div>
  );
}
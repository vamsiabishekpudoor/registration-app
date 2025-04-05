'use client';

import React from 'react';
import { FormField as Field } from '../types/form';

interface FormFieldProps {
  field: Field;
  value: string | string[] | boolean;
  onChange: (name: string, value: string | string[] | boolean) => void;
}

const FormField: React.FC<FormFieldProps> = ({ field, value, onChange }) => {
  switch (field.type) {
    case 'text':
      return (
        <label className="block mb-4">
          <span className="text-gray-700">{field.name}:</span>
          <input
            type="text"
            value={value as string}
            onChange={(e) => onChange(field.name, e.target.value)}
            className="mt-1 block w-full max-w-xs p-2 border border-gray-300 rounded-md"
            required
          />
        </label>
      );
    case 'textarea':
      return (
        <label className="block mb-4">
          <span className="text-gray-700">{field.name}:</span>
          <textarea
            value={value as string}
            onChange={(e) => onChange(field.name, e.target.value)}
            className="mt-1 block w-full max-w-xs p-2 border border-gray-300 rounded-md"
            required
          />
        </label>
      );
    case 'radio':
      return (
        <div className="block mb-4">
          <span className="text-gray-700">{field.name}:</span>
          <div className="mt-1 space-y-2">
            {field.options?.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  checked={value === option}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  className="mr-2"
                  required
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      );
    case 'checkbox':
      return (
        <div className="block mb-4">
          <span className="text-gray-700">{field.name}:</span>
          <div className="mt-1 space-y-2">
            {field.options?.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  name={field.name}
                  value={option}
                  checked={(value as string[])?.includes(option) || false}
                  onChange={(e) => {
                    const currentValues = (value as string[]) || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter((v) => v !== option);
                    onChange(field.name, newValues);
                  }}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      );
    case 'dropdown':
      return (
        <label className="block mb-4">
          <span className="text-gray-700">{field.name}:</span>
          <select
            value={value as string}
            onChange={(e) => onChange(field.name, e.target.value)}
            className="mt-1 block w-full max-w-xs p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      );
    default:
      return null;
  }
};

export default FormField;
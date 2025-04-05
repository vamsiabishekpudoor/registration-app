
export type FieldType = 'text' | 'textarea' | 'radio' | 'checkbox' | 'dropdown';
export interface FormField {
    name: string;
    type: FieldType;
    options?: string[]; // For radio, dropdown and checkbox
  }
  
  export interface Form {
    id: string;
    name: string;
    fields: FormField[];
  }
  
  export interface Submission {
    [key: string]: string | string[] | boolean; // Supports different field types
  }
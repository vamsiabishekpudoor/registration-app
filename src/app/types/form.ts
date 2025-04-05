export interface FormField {
    name: string;
    type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'dropdown';
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
import { FieldApi } from "@tanstack/react-form";


export function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {

  return (
    <>
      {field.state.meta.errors ? (
        <em className="text-error-content text-xs">{field.state.meta.errors}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

export interface FormFieldProps<T> {
  field: FieldApi<T, any, any>;
  fieldKey: keyof T extends string ? keyof T : never;
  fieldlabel?:string;
  className?: string;
}

import { FieldValues, FormState, Path, UseFormRegister } from "react-hook-form";

export function FieldInfo<T extends FieldValues>({ formState,fieldKey }: { formState: FormState<T>; fieldKey: Path<T> }) {
  const fieldError = formState.errors[fieldKey]?.message?.toString();
  return (
    <>
      {fieldError ? (
        <em className="text-error-content text-xs">{fieldError}</em>
      ) : null}
      {formState.isValidating ? "Validating..." : null}
    </>
  );
}

export interface FormFieldProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  formState:FormState<T>;
  required?: boolean;
  fieldKey: Path<T>;
  fieldlabel?: string;
  className?: string;
}

import { FormLabel } from "@/components/park/ui/form-label";
import { Input } from "@/components/park/ui/input";
import { FormFieldProps, FieldInfo } from "./components";
import { Textarea } from "@/components/park/ui/textarea";
import { twMerge } from "tailwind-merge";

export interface TextFormFieldProps<T> extends FormFieldProps<T> {
  inputOptions?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function TextFormField<T>({
  field,
  fieldKey,
  fieldlabel,
  inputOptions,
  className,
}: TextFormFieldProps<T>) {
  const inputClassname = twMerge(
    field.state.meta.touchedErrors.length>0 ? "border-error-content" : "",
    className
  );

  return (
    <div className="w-full">
      <FormLabel htmlFor={fieldKey} className="capitalize">
        {fieldlabel || fieldKey}
      </FormLabel>
      <Input
        id={fieldKey}
        name={fieldKey}
        placeholder={fieldlabel?`enter ${fieldlabel}`:`enter ${fieldKey}`}
        {...inputOptions}
        className={inputClassname}
        // @ts-expect-error
        value={field.state.value}
      />
      <FieldInfo field={field} />
    </div>
  );
}
export interface TextAreaFormFieldProps<T> extends FormFieldProps<T> {
  inputOptions?: React.InputHTMLAttributes<HTMLTextAreaElement>;
}

export function TextAreaFormField<T>({
  field,
  fieldKey,
  fieldlabel,
    inputOptions,
  className,
}: TextAreaFormFieldProps<T>) {
  const inputClassname = twMerge(
    field.state.meta.touchedErrors ? "bg-bg-default border-error-content" : "bg-bg-default",
    className
  );
  return (
    <div className="w-full">
      <FormLabel htmlFor={fieldKey} className="capitalize">
        {fieldlabel || fieldKey}
      </FormLabel>
      <Textarea
        id={fieldKey}
        name={fieldKey}
        placeholder={fieldlabel ? `enter ${fieldlabel}` : `enter ${fieldKey}`}
        {...inputOptions}
        className={inputClassname}
        // @ts-expect-error
        value={field.state.value}
        onBlur={field.handleBlur}
        //   @ts-expect-error
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <FieldInfo field={field} />
    </div>
  );
}

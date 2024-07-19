import { FormLabel } from "@/components/park/ui/form-label";
import { Input } from "@/components/park/ui/input";
import { FormFieldProps, FieldInfo } from "./components";
import { Textarea } from "@/components/park/ui/textarea";
import { twMerge } from "tailwind-merge";
import {  FieldValues } from "react-hook-form";
import ReactTextareaAutosize from "react-textarea-autosize";
export interface TextFormFieldProps<T extends FieldValues> extends FormFieldProps<T> {
  inputOptions?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function TextFormField<T extends FieldValues>({
  formState,
  register,
  required,
  fieldKey,
  fieldlabel,
  inputOptions,
  className,
}: TextFormFieldProps<T>) {
  const inputClassname = twMerge(
    formState.errors[fieldKey]?.message?.toString() ? "border-error-content" : "",
    className
  );

  return (
    <div className="w-full">
      <FormLabel htmlFor={fieldKey} className="capitalize">
        {fieldlabel || fieldKey}
      </FormLabel>
      <Input
        id={fieldKey}
        placeholder={fieldlabel ? `enter ${fieldlabel}` : `enter ${fieldKey}`}
        className={inputClassname}
        {...inputOptions}
        {...register(fieldKey, { required })}
        size="md"
      />
      <FieldInfo fieldKey={fieldKey} formState={formState} />
    </div>
  );
}
export interface TextAreaFormFieldProps<T extends FieldValues> extends FormFieldProps<T> {
  inputOptions?: React.InputHTMLAttributes<HTMLTextAreaElement>;
}

export function TextAreaFormField<T extends FieldValues>({
  formState,
  register,
  required,
  fieldKey,
  fieldlabel,
  inputOptions,
  className,
}: TextAreaFormFieldProps<T>) {
  const inputClassname = twMerge(
    formState.errors[fieldKey]?.message?.toString() ? "border-error-content" : "",
    className
  );
  return (
    <div className="w-full">
      <FormLabel htmlFor={fieldKey} className="capitalize">
        {fieldlabel || fieldKey}
      </FormLabel>
      <Textarea
        id={fieldKey}
        placeholder={fieldlabel ? `enter ${fieldlabel}` : `enter ${fieldKey}`}
        className={inputClassname}
        {...inputOptions}
        {...register(fieldKey, { required })}
        size="md"
      />
      <FieldInfo fieldKey={fieldKey} formState={formState} />
    </div>
  );
}
export function ResizeTextAreaFormField<T extends FieldValues>({
  formState,
  register,
  required,
  fieldKey,
  fieldlabel,
  inputOptions,
  className,
}: TextAreaFormFieldProps<T>) {
  const inputClassname = twMerge(
    formState.errors[fieldKey]?.message?.toString()
      ? "min-h-[100px] p-1 rounded-lg border-error-content"
      : "min-h-[100px] p-1 rounded-lg",
    className 
  );
  return (
    <div className="w-full flex flex-col">
      <FormLabel htmlFor={fieldKey} className="capitalize">
        {fieldlabel || fieldKey}
      </FormLabel>
      {/* @ts-expect-error */}
      <ReactTextareaAutosize
        id={fieldKey}
        placeholder={fieldlabel ? `enter ${fieldlabel}` : `enter ${fieldKey}`}
        className={inputClassname}
        {...inputOptions}
        {...register(fieldKey, { required })}
     
      />
      <FieldInfo fieldKey={fieldKey} formState={formState} />
    </div>
  );
}

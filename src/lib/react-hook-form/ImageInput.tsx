import { FormLabel } from "@/components/park/ui/form-label";
import { Input } from "@/components/park/ui/input";
import { twMerge } from "tailwind-merge";
import { FieldInfo, FormFieldProps } from "./components";
import { FieldValues, UseFormWatch } from "react-hook-form";

interface ImageInputProps<T extends FieldValues> extends FormFieldProps<T> {
  inputOptions?: React.InputHTMLAttributes<HTMLInputElement>;
  watch: UseFormWatch<T>;
}


export function ImageURLInputField<T extends FieldValues>({
  formState,
  register,
  required,
  fieldKey,
  fieldlabel,
  inputOptions,
  className,
  watch
}: ImageInputProps<T>) {
  const inputClassname = twMerge(
    formState.errors[fieldKey]?.message?.toString() ? "border-error-content" : "",
    className
  );

  const value = watch(fieldKey)
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 p-1">
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
      <img src={value ?? ""} key={value} />
    </div>
  );
}

import { TextFormField } from "@/lib/tanstack/form/TextFields";
import { useForm } from "@tanstack/react-form";

interface TestTanstackFormProps {}

interface TestTanstackFormFields{
    name:string;
    email:string;
    password:string;
    passwordConfirm:string;
    username:string;
    code:string;
    backupEmail:string;
}

export function TestTanstackForm({}: TestTanstackFormProps) {
  const form = useForm<TestTanstackFormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      username: "",
      code: "",
      backupEmail: "",
    },
    onSubmit: async ({ value }) => {
      console.log("==================== reset password ==============", value);
    },
  });
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <form className="w-[90%] md:w-[60%] lg:w-[50%] h-full flex flex-col items-center justify-center p-[2%] bg-bg-muted rounded-md gap-4 ">
        <form.Field
        name="name"
        children={(field)=>{
            return (
              <TextFormField<TestTanstackFormFields>
                field={field}
                fieldKey="name"
                fieldlabel="name"
                inputOptions={{
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
        }}
        />
        <form.Field
        name="email"
        children={(field)=>{
            return (
              <TextFormField<TestTanstackFormFields>
                field={field}
                fieldKey="email"
                fieldlabel="email"
                inputOptions={{
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
        }}
        />
        <form.Field
        name="password"
        children={(field)=>{
            return (
              <TextFormField<TestTanstackFormFields>
                field={field}
                fieldKey="password"
                fieldlabel="password"
                inputOptions={{
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
        }}
        />
        <form.Field
        name="passwordConfirm"
        children={(field)=>{
            return (
              <TextFormField<TestTanstackFormFields>
                field={field}
                fieldKey="passwordConfirm"
                fieldlabel="passwordConfirm"
                inputOptions={{
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
        }}
        />
        <form.Field
        name="username"
        children={(field)=>{
            return (
              <TextFormField<TestTanstackFormFields>
                field={field}
                fieldKey="username"
                fieldlabel="username"
                inputOptions={{
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
        }}
        />
        <form.Field
        name="code"
        children={(field)=>{
            return (
              <TextFormField<TestTanstackFormFields>
                field={field}
                fieldKey="code"
                fieldlabel="code"
                inputOptions={{
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
        }}
        />
        <form.Field
        name="backupEmail"
        children={(field)=>{
            return (
              <TextFormField<TestTanstackFormFields>
                field={field}
                fieldKey="backupEmail"
                fieldlabel="backupEmail"
                inputOptions={{
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
        }}
        />
      </form>
    </div>
  );
}

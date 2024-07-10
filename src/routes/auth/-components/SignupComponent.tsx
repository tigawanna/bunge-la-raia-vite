import { formOptions, useForm } from "@tanstack/react-form";
import { FormLabel } from "@/components/park/ui/form-label";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toaster } from "@/components/navigation/ParkuiToast";
import { TextFormField } from "@/lib/tanstack/form/TextFields";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { Checkbox } from "@/components/park/ui/checkbox";
import { useState } from "react";
import { viewerqueryOptions } from "@/lib/tanstack/query/use-viewer";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase/client";

interface SignupComponentProps {}

interface UserCreate{
  email: string;
  password: string;
  passwordConfirm: string
  username: string;
}

const formOpts = formOptions<UserCreate>({
  defaultValues: {
    password: "",
    passwordConfirm: "",
    email: "",
    username:""
  },
});

export function SignupComponent({}: SignupComponentProps) {
  const [showPassword, setShowPassword] = useState(false);
  const qc = useQueryClient();
  const navigate = useNavigate({ from: "/auth/signup" });
  const mutation = useMutation({
    mutationFn: (data: Required<UserCreate>) => {
      return supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            username: data.username,
          },
        },
      });
    },
    onSuccess(data) {
      toaster.create({
        title: "signed up",
        description: `Welcome ${data.data.user?.email}`,
        type: "success",
        duration: 2000,
      });
      qc.invalidateQueries(viewerqueryOptions);

      navigate({ to: "/profile" });
      if (typeof window !== "undefined") {
        location.reload();
      }
    },
    onError(error) {
      console.log(error.name);
      toaster.create({
        title: "Something went wrong",
        description: `${error.message}`,
        type: "error",
        duration: 20000,
      });
    },
  });
  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      await mutation.mutate(value);
    },
  });

  return (
    <div className="w-full  h-full flex flex-col items-center justify-center   ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="w-[90%] md:w-[60%] lg:w-[50%] h-full flex flex-col items-center justify-center p-[2%] bg-bg-muted rounded-md gap-3 ">
        <h1 className="text-4xl">Sign up</h1>
        <form.Field
          name="username"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string(),
          }}
          children={(field) => {
            return (
              <TextFormField<UserCreate>
                field={field}
                fieldKey="username"
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
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string().email(),
          }}
          children={(field) => {
            return (
              <TextFormField<UserCreate>
                field={field}
                fieldKey="email"
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
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string().min(8),
          }}
          children={(field) => {
            return (
              <TextFormField<UserCreate>
                field={field}
                fieldKey="password"
                inputOptions={{
                  type: showPassword ? "text" : "password",
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
          }}
        />
        <form.Field
          name="passwordConfirm"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string().min(8),
          }}
          children={(field) => {
            return (
              <TextFormField<UserCreate>
                field={field}
                fieldKey="passwordConfirm"
                fieldlabel="Confirm password"
                inputOptions={{
                  type: showPassword ? "text" : "password",
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
          }}
        />
        <div className="w-full">
          <div className="w-full flex gap-3">
            <div className=""></div>
            <FormLabel htmlFor="showPassword">Show password</FormLabel>
            <Checkbox
              id="showPassword"
              name="showPassword"
              className="border-2 border-accent-default"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>

        <MutationButton mutation={mutation} />
      </form>
    </div>
  );
}

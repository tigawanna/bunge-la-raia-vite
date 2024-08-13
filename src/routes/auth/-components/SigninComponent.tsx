import { Link, useNavigate, useSearch } from "@tanstack/react-router";
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
import { supabase } from "@/lib/supabase/client";
import { OauthSigninButtons } from "./OauthSigninButtons";

interface SigninComponentProps {}

interface PropertyUserLogn {
  email: string;
  password: string;
}

const formOpts = formOptions<PropertyUserLogn>({
  defaultValues: {
    email: "",
    password: "",

  },
});
export function SigninComponent({}: SigninComponentProps) {
  const [showPassword, setShowPassword] = useState(false);
  const qc = useQueryClient();
  const { returnTo } = useSearch({ from: "/auth/" });

  const navigate = useNavigate({ from: "/auth" });
  const mutation = useMutation({
    mutationFn: async (data: PropertyUserLogn) => {
      return await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
    },
    onSuccess(data) {
      toaster.create({
        title: "signed in",
        description: `Welcome ${data.data.user?.email}`,
        type: "success",
      });
      qc.invalidateQueries(viewerqueryOptions);
      navigate({ to: returnTo || "/" });
    },
    onError(error) {
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
        className="w-[90%] md:w-[60%] lg:w-[50%] h-full flex flex-col items-center justify-center p-[2%] bg-bg-muted rounded-md gap-4 ">
        <h1 className="text-4xl">Sign in</h1>
        <form.Field
          name="email"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string().email(),
          }}
          children={(field) => {
            return (
              <TextFormField<PropertyUserLogn>
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
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string().min(8),
          }}
          children={(field) => {
            return (
              <TextFormField<PropertyUserLogn>
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
      <div className="w-full flex flex-col justify-center items-center gap-2 mt-3 p-3">
        <Link to="/auth/signup" search={{ returnTo }} className="hover:text-accent-emphasized">
          New here? Sign up instead
        </Link>

        <span className="">----------------------------- or -----------------------------</span>
      </div>
      <OauthSigninButtons />
    </div>
  );
}

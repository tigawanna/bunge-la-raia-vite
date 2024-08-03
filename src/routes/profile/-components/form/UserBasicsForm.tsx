import { useMutation } from "@tanstack/react-query";
import { toaster } from "@/components/navigation/ParkuiToast";
import { supabase } from "@/lib/supabase/client";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { ImageURLInputField, ResizeTextAreaFormField, TextFormField } from "@/lib/tanstack/form/TextFields";
import { z } from "zod";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { UserProfileInsertType, UserProfileRowType } from "../types";
import { useCurrentLocation } from "@/utils/hooks/use-current-location";


interface UserProfileBasicsFormProps {
  user_profile?: UserProfileRowType;
  next: (user_profile: UserProfileRowType) => void;
}

export function UserProfileBasicsForm({ user_profile, next }: UserProfileBasicsFormProps) {

const {location} = useCurrentLocation()

  const mutation = useMutation({
    mutationFn: async (vars: UserProfileInsertType) => {
      const { error, data } = await supabase.from("users").upsert(vars).select().single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: (data) => {
      //   navigate({ to: "/candidates/$candidate", params: { id: viewer?.id! } });
      toaster.create({
        title: "Success",
        description: `Aspiration created successfully`,
        type: "success",
      });
      next(data as any as UserProfileRowType);
    },
    onError: (error) => {
      toaster.create({
        type: "error",
        title: "Something went wrong",
        description: `${error.message}`,
      });
    },
    meta: {
      invalidate: ["user", user_profile?.id],
    },
  });
  const form = useForm<UserProfileInsertType>({
    defaultValues: {
      username: user_profile?.username ?? "",
      bio: user_profile?.bio ?? "",
      gps: user_profile?.gps??`POINT(${location?.latitude} ${location?.longitude})`,
      avatar_url: user_profile?.avatar_url ?? "",
      banner_url:user_profile?.banner_url ?? "",
      fullname: user_profile?.fullname ?? "",
      vibe_check: user_profile?.vibe_check ?? [],
    },
    onSubmit: async ({ value }) => {
      await mutation.mutate(value);
    },
  });

  // console.log("user_profile in string format  =========== ",JSON.stringify(user_profile?.vibe_check))
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="w-[90%] md:w-[60%] lg:w-[50%] h-full flex flex-col items-center justify-center p-[2%] bg-bg-muted rounded-md gap-4 ">
        <h1 className="text-xl font-bold">User Profile basics</h1>
        <form.Field
          name="fullname"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string(),
          }}
          children={(field) => {
            return (
              <TextFormField<UserProfileInsertType>
                field={field}
                fieldKey="fullname"
                fieldlabel="Bio"
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
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string(),
          }}
          children={(field) => {
            return (
              <TextFormField<UserProfileInsertType>
                field={field}
                fieldKey="username"
                fieldlabel="Bio"
                inputOptions={{
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
          }}
        />

        <form.Field
          name="bio"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string().min(50).max(700),
          }}
          children={(field) => {
            return (
              <ResizeTextAreaFormField<UserProfileInsertType>
                field={field}
                fieldKey="bio"
                fieldlabel="Bio"
                inputOptions={{
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
          }}
        />
        <form.Field
          name="avatar_url"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string(),
          }}
          children={(field) => {
            return (
              <ImageURLInputField<UserProfileInsertType>
                field={field}
                fieldKey="avatar_url"
                fieldlabel="Avatar URL"
                inputOptions={{
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
          }}
        />
        <form.Field
          name="banner_url"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string(),
          }}
          children={(field) => {
            return (
              <ImageURLInputField<UserProfileInsertType>
                field={field}
                fieldKey="banner_url"
                fieldlabel="Banner URL"
                inputOptions={{
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
          }}
        />

        <MutationButton label="Save and continue" type="submit" mutation={mutation} />
      </form>
    </div>
  );
}

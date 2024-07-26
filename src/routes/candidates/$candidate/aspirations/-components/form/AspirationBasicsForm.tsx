import { useMutation } from "@tanstack/react-query";
import { CandidateAspirationInsertType, CandidateAspirationRowType } from "../types";
import { toaster } from "@/components/navigation/ParkuiToast";
import { supabase } from "@/lib/supabase/client";
import { useForm,useField } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { ResizeTextAreaFormField, TextFormField } from "@/lib/tanstack/form/TextFields";
import { z } from "zod";
import { SelectFields } from "@/lib/tanstack/form/SelectFields";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";

import { AspirationToLeadModal } from "./AspirationToLeadCounty";

interface AspirationBasicsFormProps {
  aspiration?: CandidateAspirationRowType;
  viewer: { id: string };
  next: (aspiration: CandidateAspirationRowType) => void;
}

export function AspirationBasicsForm({ aspiration, viewer, next }: AspirationBasicsFormProps) {
  const mutation = useMutation({
    mutationFn: async (vars: CandidateAspirationInsertType) => {
      const { error, data } = await supabase
        .from("candidate_aspirations")
        .upsert(vars)
        .select()
        .single();
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
      next(data as CandidateAspirationRowType);
    },
    onError: (error) => {
      toaster.create({
        type: "error",
        title: "Something went wrong",
        description: `${error.message}`,
      });
    },
  });
  const form = useForm<CandidateAspirationInsertType>({
    defaultValues: {
      candidate_id: viewer?.id ?? aspiration?.candidate_id,
      mission_statement: aspiration?.mission_statement ?? "",
      period: aspiration?.period ?? "",
      vying_for: aspiration?.vying_for ?? "mca",
      vibe_check: aspiration?.vibe_check ?? [],
      constituency_id: aspiration?.constituency_id ?? null,
      county_id: aspiration?.county_id ?? null,
      ward_id: aspiration?.ward_id ?? null,
    },
    onSubmit: async ({ value }) => {
      await mutation.mutate(value);
    },
  });

form.store.subscribe(() => {
  console.log("watch county id  ======== ",form.store.state.values.county_id);
});

  function setVyingIn(vying_for: "president" | "governor" | "mp" | "mca",vying_in_id:number) {
    if(vying_for === "president") return
    if(vying_for === "governor"){
      form.setFieldValue("county_id",vying_in_id)
    }
    if(vying_for === "mp"){
      form.setFieldValue("constituency_id",vying_in_id)
    }
    if(vying_for === "mca"){
      form.setFieldValue("ward_id",vying_in_id)
    }
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="w-[90%] md:w-[60%] lg:w-[50%] h-full flex flex-col items-center justify-center p-[2%] bg-bg-muted rounded-md gap-4 ">
        <div className="w-full flex flex-col lg:flex-row justify-center gap-3">
          <form.Field
            name="vying_for"
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.enum(["president", "governor", "mp", "mca"]),
            }}
            children={(field) => {
              return (
                <SelectFields<CandidateAspirationInsertType, "vying_for">
                  field={field}
                  fieldKey="vying_for"
                  fieldlabel="Vying For"
                  items={[
                    {
                      label: "President",
                      value: "president",
                    },
                    {
                      label: "Governor",
                      value: "governor",
                    },
                    {
                      label: "MP",
                      value: "mp",
                    },
                    {
                      label: "MCA",
                      value: "mca",
                    },
                  ]}
                  inputOptions={{
                    onBlur: field.handleBlur,
                    onChange: (e) =>
                      field.handleChange(e.target.value as "president" | "governor" | "mp" | "mca"),
                  }}
                />
              );
            }}
          />
          <div className="w-full flex flex-col">
            <form.Subscribe
            selector={(form) => form.values.vying_for}
              children={(field) => {
                const areaLeader={
                  president: "country",
                  governor: "counties",
                  mp:"constituencies",
                  mca:"wards"
                } as const
          
                if (areaLeader[field] === "country") return
    
                  return (
                    <AspirationToLeadModal
                      route="/"
                      setItem={(item) => setVyingIn(field, item.id)}
                      filterBy={"name"}
                      table={areaLeader[field]}
                      searchQuery=""
                    />
                  );
              }}
            />
          </div>

          <form.Field
            name="period"
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.string(),
            }}
            children={(field) => {
              const default_date = aspiration?.period
                ? new Date(aspiration?.period).toISOString().substring(0, 10)
                : new Date().toISOString().substring(0, 10);
              console.log("current time = ", default_date);
              return (
                <TextFormField<CandidateAspirationInsertType>
                  field={field}
                  fieldKey="period"
                  fieldlabel="Period"
                  inputOptions={{
                    type: "date",
                    value: default_date,
                    onBlur: field.handleBlur,
                    onChange: (e) => field.handleChange(e.target.value),
                  }}
                />
              );
            }}
          />
        </div>
        <form.Field
          name="mission_statement"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string().min(50).max(700),
          }}
          children={(field) => {
            return (
              <ResizeTextAreaFormField<CandidateAspirationInsertType>
                field={field}
                fieldKey="mission_statement"
                fieldlabel="Mission Statement"
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

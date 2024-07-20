import { concatErrors } from "@/utils/concaterrors";
import { PostgrestError } from "@supabase/supabase-js";

interface TanstackSupabaseErrorProps {
  error: Error | PostgrestError | null;
}

export function TanstackSupabaseError({ error }: TanstackSupabaseErrorProps) {
  if (!error) return;
  if ("name" in error && error?.name) {
    return (
      <div className="w-[90%] h-full min-h-[50vh] flex items-center justify-center m-1 p-2 ">
        <div className="w-full h-full flex flex-col items-center justify-center m-1 p-[5%] bg-error text-error-content  rounded-lg">
          <h1 className="text-xl">{error?.name}</h1>
          <p className="text-center  text-error-content ">{concatErrors(error?.message ?? "")}</p>
        </div>
      </div>
    );
  }
  if ("details" in error && "hint" in error) {
    return (
      <div className="w-[90%] h-full min-h-[50vh] flex items-center justify-center m-1 p-2 ">
        <div className="w-full h-full flex flex-col items-center justify-center m-1 p-[5%] bg-error text-error-content  rounded-lg">
          <h1 className="text-xl">{error?.code}</h1>
          <h1 className="text-xl">{error?.message}</h1>
          <p className="text-center  text-error-content ">
            {concatErrors(error?.details ?? "")}
            {/* {JSON.stringify(concatErrors(error))} */}
          </p>
          <p className="text-center  text-error-content ">
            {concatErrors(error?.hint ?? "")}
            {/* {JSON.stringify(concatErrors(error))} */}
          </p>
        </div>
      </div>
    );
  }
  return;
}

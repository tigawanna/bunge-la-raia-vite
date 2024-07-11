import { concatErrors } from "@/utils/concaterrors";

interface ErrorOutputProps {
  error: {
    name: string;
    message: string;
    hint?: string;
    description?: string;
  };
}

export function ErrorOutput({ error }: ErrorOutputProps) {
  // console.log("error ", error);
  return (
    <div className="w-[90%] h-full flex items-center justify-center m-1 p-2 ">
      <div className="w-full h-full flex flex-col items-center justify-center m-1 p-[5%] bg-error text-error-content  rounded-lg">
        <h1 className="text-xl">{error?.name}</h1>
        <p className="text-center  text-error-content ">
          {concatErrors(error?.message??"")}
          {/* {JSON.stringify(concatErrors(error))} */}
        </p>
        <p className="text-center  text-error-content ">
          {concatErrors(error?.description??"")}
          {/* {JSON.stringify(concatErrors(error))} */}
        </p>
        <h1 className="text-xl">{error?.hint}</h1>
      </div>
    </div>
  );
}

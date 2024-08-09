import ReactTextareaAutosize from "react-textarea-autosize";
import { useChat } from "ai/react";
import { ChevronsLeft, ChevronsRight, RotateCcw, Send, X } from "lucide-react";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { Button } from "@/components/park/ui/button";
import { formartDateToHourMinutesSeconds } from "@/utils/date-helpers copy";
interface ChatWithCandidateProps {
  candidate_id: string;
}

export function ChatWithCandidate({ candidate_id }: ChatWithCandidateProps) {
  const endpoint = import.meta.env.VITE_CHAT_ENDPOINT;

  const { userQuery } = useViewer();
  const viewer = userQuery?.data?.data;
  const { messages, input,setInput, handleSubmit, handleInputChange, isLoading, stop, error, reload } =
    useChat({
      keepLastMessageOnError: true,
      api: endpoint,
    });
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setInput((prevInput) => prevInput + "\n");
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event, {
        body: {
          viewer_id: viewer?.id,
          candidate_id,
        },
      });
    }
  };
  
  return (
    <div className="w-full h-screen flex flex-col  items-center justify-between ">
      <h1 className="text-xl">Chat with Candidate</h1>
      <div className="w-full  flex flex-col  justify-between h-screen ">
        <ul className="w-full h-full flex flex-col justify-center gap-2 py-3 px-6">
          {messages?.map((message) => {
            if (message.role === "assistant") {
              return (
                <li
                  key={message.id}
                  className="w-full flex flex-col justify-between gap-2 p-2 bg-bg-emphasized  rounded-lg">
                  <div className="w-full flex flex-col gap-0.5">
                    <div className="flex text-accent-text gap-1 text-xs">
                      <ChevronsRight className="size-4" />
                      {formartDateToHourMinutesSeconds(message.createdAt ?? new Date())}
                    </div>
                    <p className="text-sm ">{message.content}</p>
                  </div>
                </li>
              );
            }
            return (
              <li
                key={message.id}
                className="w-full flex flex-col justify-between border gap-2 p-2  rounded-lg">
                <div className="w-ful flex flex-col gap-0.5">
                  <div className="flex  gap-1 text-xs">
                    <ChevronsLeft className="size-4" />
                    {formartDateToHourMinutesSeconds(message.createdAt ?? new Date())}
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </li>
            );
          })}

          {isLoading && (
            <li className="w-full h-[100px] p-2 bg-bg-emphasized  flex justify-center items-center rounded-2xl shimmerBG">
              <button
                type="button"
                onClick={() => stop()}
                className="flex justify-center bg-error text-error-content items-center gap-2 border px-1 rounded-lg h-fit hover:brightness-150">
                cancel <X className="size-4" />
              </button>
            </li>
          )}
          {messages?.length === 0 && (
            <li className="w-full bg-bg-emphasized flex flex-col gap-1 justify-center items-center rounded-lg min-h-[20vh] p-[4%]">
              <p>hey there ask me something about this candidate</p>
              <p className="text-xs"> keep it civil and avoid strong language am just an LLM </p>
            </li>
          )}
          {error && (
            <li className="w-full bg-error text-error-content  flex  gap-1 justify-center items-center rounded-lg min-h-[5vh] p-[3%]">
              <div className="w-full">
                <p className="">{error?.name ?? "Something went wrong"}</p>
                <p className="text-xs">
                  {error?.message ?? "Details of something that went wrong"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => reload()}
                className="flex justify-center bg-error text-error-content items-center gap-2 border px-1 rounded-lg h-fit hover:brightness-150">
                <RotateCcw />
              </button>
            </li>
          )}
        </ul>

        <form
          onSubmit={(e) =>
            handleSubmit(e, {
              body: {
                viewer_id: viewer?.id,
                candidate_id,
              },
            })
          }
          className="w-full flex items-center justify-between sticky bottom-1 left-0 right-0 p-5 gap-2">
          <ReactTextareaAutosize
            onKeyDown={handleKeyDown}
            name="prompt"
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder={"what about me do you have questions about"}
            className={"min-h-[100px] w-full p-3 rounded-lg border-error-content bg-bg-emphasized"}
          />
          <Button>
            <Send className="w-6 h-6" />
          </Button>
        </form>
      </div>
    </div>
  );
}

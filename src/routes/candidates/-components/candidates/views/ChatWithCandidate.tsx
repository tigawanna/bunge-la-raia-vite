import ReactTextareaAutosize from "react-textarea-autosize";
import { useChat } from "ai/react";
import { Loader, Send } from "lucide-react";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { Button } from "@/components/park/ui/button";
interface ChatWithCandidateProps {
  candidate_id: string;
}

export function ChatWithCandidate({ candidate_id }: ChatWithCandidateProps) {
  const endpoint = import.meta.env.VITE_CHAT_ENDPOINT;
  console.log("============ endpoint ===============", endpoint);
  const { userQuery } = useViewer();
  const viewer = userQuery?.data?.data;
  const { messages, input, handleSubmit, handleInputChange, isLoading, stop, error, reload } =
    useChat({
      keepLastMessageOnError: true,
      api: endpoint,
      onResponse(response) {
        console.log("============ chat response ===============", response);
      },
    });

  console.log("============ chat input ===============", input);
  console.log("============ chat messages ===============", messages);
  console.log("============ chat error ===============", error);
  return (
    <div className="w-full h-full flex flex-col  items-center">
      <h1 className="text-4xl">Chat with Candidate</h1>
      <div className="w-full  flex flex-col h-screen justify-between">
        {isLoading && (
          <div>
            <Loader className="animate-spin" />
            <button type="button" onClick={() => stop()}>
              Stop
            </button>
          </div>
        )}
        {error && (
          <>
            <div>An error occurred.</div>
            <button type="button" onClick={() => reload()}>
              Retry
            </button>
          </>
        )}
        <ul className="w-full h-full flex flex-col gap-2">
          {messages?.map((message) => {
            return(
            <li
              key={message.id}
              className="w-full flex flex-col justify-between gap-2 p-3 bg-bg-emphasized rounded-lg">
              <div className="w-full flex flex-col gap-1">
                <h1 className="">{message.role}</h1>
                <h1 className="text-sm">{message.content}</h1>
              </div>
            </li>
          )})}
        </ul>
        <form
          onSubmit={(e) =>
            handleSubmit(e, {
              body: {
                viewer_id: viewer?.id,
                candidate_id,
                prompt: input,
              },
            })
          }
          className="w-full  flex flex-col justify-between sticky bottom-1 left-0 right-0 p-5">
          <ReactTextareaAutosize
            name="prompt"
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder={"what about me do you have questions about"}
            className={"min-h-[100px] p-3 rounded-lg border-error-content"}
          />
          <Button>
            <Send className="w-6 h-6" />
          </Button>
        </form>
      </div>
    </div>
  );
}

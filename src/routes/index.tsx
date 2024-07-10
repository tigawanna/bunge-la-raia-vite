import { toaster } from "@/components/navigation/ParkuiToast";
import { Button } from "@/components/park/ui/button";
import { createFileRoute} from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  const navigate = useNavigate({from:"/"});
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center h-2">
      {/* <div className="bg-accent-default p-[5%]">
        <h1 className="text-3xl ">Accent test</h1>
      </div> */}
      <div className="w-full h-full flex flex-wrap gap-5 items-center justify-center text-xl text-error-content bg-error">
        UwU
      </div>
      <div className="w-full h-full flex flex-wrap gap-5 items-center justify-center">
        <Button
          variant="outline"
          onClick={() =>
            toaster.create({
              title: "Toast Title",
              description: "Toast Description",
              type: "info",
            })
          }>
          Info Toast
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toaster.create({
              title: "Toast Title",
              description: "Toast Description",
              type: "error",
            })
          }>
          Error Toast
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toaster.create({
              title: "Toast Title",
              description: "Toast Description",
              type: "success",
            })
          }>
          Success toast
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            toaster.create({
              title: "Toast Title",
              description: "Toast Description",
              type: "loading",
            })
          }>
          Loading toast
        </Button>
      </div>
      <button
        onClick={() => {
          navigate({ to: "/profile" })}}>
        redirect to profile
      </button>
    </div>
  );
}

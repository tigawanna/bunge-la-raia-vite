import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/candidates/$candidate/aspirations/$aspiration/chat")({
  component: AspirationChatPage,
});

interface AspirationChatPageProps {

}

export function AspirationChatPage({}: AspirationChatPageProps) {
  return <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
    <h1 className="text-xl">Chat</h1>
  </div>;
}

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/candidates/new')({
  component: () => <div>Hello /candidates/new!</div>
})
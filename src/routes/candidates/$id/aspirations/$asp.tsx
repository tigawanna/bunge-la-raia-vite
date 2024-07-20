import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/candidates/$id/aspirations/$asp')({
  component: () => <div>Hello /candidates/$id/aspirations/$asp!</div>
})
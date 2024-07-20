import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/candidates/$id/aspirations/new')({
  component: () => <div>Hello /candidates/$id/aspirations/new!</div>
})
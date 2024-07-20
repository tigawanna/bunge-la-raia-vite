import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/candidates/$id/aspirations/')({
  component: () => <div>Hello /candidates/$id/aspirations/!</div>
})
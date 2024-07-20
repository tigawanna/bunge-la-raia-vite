import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/candidates/$id/aspirations/$asp/form')({
  component: () => <div>Hello /candidates/$id/aspirations/$asp/form!</div>
})
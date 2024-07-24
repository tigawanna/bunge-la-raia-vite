import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/candidates/$candidate/aspirations/$aspiration/')({
  component: () => <div>Hello /candidates/$candidate/aspirations/$aspiration/!</div>
})
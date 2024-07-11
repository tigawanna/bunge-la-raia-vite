import { createFileRoute } from '@tanstack/react-router'
import { HomeComponent } from './-component/HomeComponent';

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

import { createFileRoute } from '@tanstack/react-router'
import { HomeComponent } from './-component/HomeComponent';
import { authGuard } from '@/lib/tanstack/query/use-viewer';

export const Route = createFileRoute("/")({
  component: HomeComponent,
  async beforeLoad(ctx) {
    await authGuard({ctx});
  }
});

import { createFileRoute } from '@tanstack/react-router'
import { CandidateForm } from './-components/candidates/form/CandidateForm';

export const Route = createFileRoute("/candidates/new")({
  component: CandidateForm,
});

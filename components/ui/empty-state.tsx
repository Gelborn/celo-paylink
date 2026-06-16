import { useId, type ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

function getEmptyStateId(title: string) {
  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `empty-state-${slug || "content"}`;
}

export function EmptyState({
  title,
  description,
  actions
}: {
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  const uniqueId = useId();
  const baseId = `${getEmptyStateId(title)}-${uniqueId}`;
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;

  return (
    <Card role="region" aria-labelledby={titleId} aria-describedby={descriptionId}>
      <CardHeader className="space-y-2">
        <CardTitle id={titleId}>{title}</CardTitle>
        <CardDescription id={descriptionId}>{description}</CardDescription>
      </CardHeader>
      {actions ? (
        <CardContent className="flex flex-wrap gap-3 pt-0" role="group" aria-labelledby={titleId}>
          {actions}
        </CardContent>
      ) : null}
    </Card>
  );
}

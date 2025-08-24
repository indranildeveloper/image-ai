"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { Loader2Icon, TriangleAlertIcon } from "lucide-react";
import {
  TTemplatesResponseType,
  useGetTemplates,
} from "@/features/projects/api/useGetTemplates";
import TemplateCard from "./TemplateCard";
import { useCreateProject } from "@/features/projects/api/useCreateProject";
import { usePaywall } from "@/features/subscriptions/hooks/usePaywall";

const TemplatesSection: FC = () => {
  const router = useRouter();
  const mutation = useCreateProject();
  const { data, isLoading, isError } = useGetTemplates({
    page: "1",
    limit: "4",
  });
  const paywall = usePaywall();

  const handleCreateProjectWithTemplate = (
    template: TTemplatesResponseType["data"][0],
  ) => {
    if (template.isPremium && paywall.shouldBlock) {
      paywall.triggerPaywall();
      return;
    }

    mutation.mutate(
      {
        name: `${template.name} Project`,
        json: template.json,
        width: template.width,
        height: template.height,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Start from a template</h2>
        <div className="flex h-32 items-center justify-center">
          <Loader2Icon className="text-muted-foreground size-6 animate-spin" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Start from a template</h2>
        <div className="flex h-32 flex-col items-center justify-center gap-y-4">
          <TriangleAlertIcon className="text-muted-foreground size-6" />
          <p>Failed to fetch templates!</p>
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return null;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold">Start from a template</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        {data.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.name}
            imgSrc={template.thumbnailUrl || ""}
            description={`${template.width} x ${template.height} px`}
            onClick={() => handleCreateProjectWithTemplate(template)}
            disabled={mutation.isPending}
            width={template.width}
            height={template.height}
            isPremium={template.isPremium}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplatesSection;

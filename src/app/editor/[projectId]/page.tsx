"use client";

import { FC } from "react";
import { useParams } from "next/navigation";
import Editor from "@/features/editor/components/Editor";
import { ArrowRightIcon, Loader2Icon, TriangleAlertIcon } from "lucide-react";
import { useGetProject } from "@/features/projects/api/useGetProject";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EditorProjectIdPage: FC = () => {
  const params = useParams();

  const { data, isLoading, isError } = useGetProject(
    params.projectId as string,
  );

  if (isLoading || !data) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Loader2Icon className="text-muted-foreground size-6 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-y-2">
        <TriangleAlertIcon className="text-muted-foreground size-6" />
        <p className="text-muted-foreground text-sm">
          Failed to fetch the project!
        </p>
        <Button asChild>
          <Link href="/">
            Go Home <ArrowRightIcon className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Editor initialData={data} />
    </div>
  );
};

export default EditorProjectIdPage;

"use client";

import { FC, Fragment } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useGetProjects } from "@/features/projects/api/useGetProjects";
import { useDuplicateProject } from "@/features/projects/api/useDuplicateProject";
import {
  AlertTriangleIcon,
  CopyIcon,
  FileIcon,
  Loader2Icon,
  MoreHorizontalIcon,
  SearchIcon,
  TrashIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const ProjectsSection: FC = () => {
  const router = useRouter();
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetProjects();
  const duplicateMutation = useDuplicateProject();

  const handleCopyProject = (projectId: string) => {
    duplicateMutation.mutate({ projectId });
  };

  if (status === "pending") {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Recent Projects</h2>
        <div className="flex h-32 flex-col items-center justify-center gap-y-4">
          <Loader2Icon className="text-muted-foreground size-6 animate-spin" />
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Recent Projects</h2>
        <div className="flex h-32 flex-col items-center justify-center gap-y-4">
          <AlertTriangleIcon className="text-muted-foreground size-6" />
          <p className="text-muted-foreground text-sm">
            Failed to load projects!
          </p>
        </div>
      </div>
    );
  }

  if (!data.pages.length) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Recent Projects</h2>
        <div className="flex h-32 flex-col items-center justify-center gap-y-4">
          <SearchIcon className="text-muted-foreground size-6" />
          <p className="text-muted-foreground text-sm">No projects found!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Recent Projects</h2>
      <Table>
        <TableBody>
          {data.pages.map((group, idx) => (
            <Fragment key={idx}>
              {group.data.map((project) => (
                <TableRow key={project.id}>
                  <TableCell
                    onClick={() => router.push(`/editor/${project.id}`)}
                    className="flex cursor-pointer items-center gap-x-2 font-medium"
                  >
                    <FileIcon className="size-6" />
                    <span>{project.name}</span>
                  </TableCell>
                  <TableCell
                    onClick={() => router.push(`/editor/${project.id}`)}
                    className="hidden cursor-pointer md:table-cell"
                  >
                    {project.width} x {project.height} px
                  </TableCell>
                  <TableCell
                    onClick={() => router.push(`/editor/${project.id}`)}
                    className="hidden cursor-pointer md:table-cell"
                  >
                    {formatDistanceToNow(project.updatedAt, {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell className="flex items-center justify-end">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={false}>
                          <MoreHorizontalIcon className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-60">
                        <DropdownMenuItem
                          className="h-10 cursor-pointer"
                          disabled={duplicateMutation.isPending}
                          onClick={() => handleCopyProject(project.id)}
                        >
                          <CopyIcon className="size-4" />
                          <span>Make a copy</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-10 cursor-pointer"
                          disabled={false}
                          onClick={() => {}}
                        >
                          <TrashIcon className="size-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
      {hasNextPage && (
        <div className="flex w-full items-center justify-center pt-4">
          <Button
            variant="ghost"
            disabled={isFetchingNextPage}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage && (
              <Loader2Icon className="text-muted-foreground size-4 animate-spin" />
            )}
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;

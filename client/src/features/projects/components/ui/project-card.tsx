"use client";

import Link from "next/link";
import { Github, Lock, Clock, ExternalLink, GitBranch, MoreHorizontal, Trash2 } from "lucide-react";
import * as DropdownMenu from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils/cn";
import { FrameworkBadge } from "./framework-badge";
import { DeploymentStatusBadge } from "./deployment-status-badge";
import type { Project } from "@/types/domain";

interface ProjectCardProps {
  project: Project;
  latestDeployment?: {
    status: string;
    created_at: string;
    build_number?: number;
  } | null;
  onClick?: () => void;
  onDelete?: () => void;
  deleteDisabled?: boolean;
  variant?: "dashboard" | "list" | "import";
  showActions?: boolean;
}

export function ProjectCard({
  project,
  latestDeployment,
  onClick,
  onDelete,
  deleteDisabled = false,
  variant = "dashboard",
  showActions = false,
}: ProjectCardProps) {
  const branch = project.configured_branch.replace("refs/heads/", "");
  const isPrivate = !project.repository_available;

  const baseClasses = "group relative overflow-hidden rounded-2xl border transition-all hover:-translate-y-0.5 hover:border-white/[0.15]";
  const variantClasses = {
    dashboard: "bg-white/[0.02] p-5 border-white/[0.08] hover:bg-white/[0.04]",
    list: "bg-white/[0.02] p-4 border-white/[0.08] flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 hover:bg-white/[0.04]",
    import: "bg-white/[0.02] p-4 border-white/[0.08] cursor-pointer hover:bg-white/[0.05] hover:border-cyan-300/30",
  };

  const handleClick = () => onClick?.();

  const projectName = (
    <Link
      href={`/projects/${project.id}`}
      onClick={(event) => event.stopPropagation()}
      title={project.repository_name}
      className="block min-w-0 break-words rounded-md text-left font-medium text-white transition-colors hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      {project.repository_name}
    </Link>
  );

  const destructiveAction = onDelete ? (
    <DropdownMenu.DropdownMenuItem
      className="text-rose-200 focus:bg-rose-500/10 focus:text-rose-100"
      onSelect={(event) => {
        event.preventDefault();
        onDelete();
      }}
      disabled={deleteDisabled}
    >
      <Trash2 className="size-3.5" />
      Delete Project
    </DropdownMenu.DropdownMenuItem>
  ) : null;

  if (variant === "import") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(baseClasses, variantClasses.import, "w-full text-left")}
      >
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/15 to-fuchsia-500/15">
            <Github className="size-5 text-white/60" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="min-w-0 break-words text-left font-medium text-white group-hover:text-white">
                {project.repository_name}
              </h3>
              {isPrivate && <Lock className="size-3.5 text-amber-300/70" aria-label="Private" />}
            </div>
            <p className="mt-1 break-words text-xs text-white/35" title={project.repository_full_name}>
              {project.repository_full_name}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] text-white/35">
              <span className="inline-flex items-center gap-1">
                <GitBranch className="size-3" />
                {branch}
              </span>
              {project.updated_at && (
                <span>Updated {new Date(project.updated_at).toLocaleDateString()}</span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center px-3 text-cyan-300/60">
            <ExternalLink className="size-5" />
          </div>
        </div>
      </button>
    );
  }

  return (
    <article className={cn(baseClasses, variantClasses[variant])} onClick={handleClick}>
      <div className="flex w-full items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/15 to-fuchsia-500/15">
            <Github className="size-4.5 text-white/65" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="min-w-0 break-words">{projectName}</div>
            <p className="mt-1 break-words text-xs text-white/35" title={project.repository_full_name}>
              {project.repository_full_name}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {isPrivate && (
            <span className="flex shrink-0 items-center gap-1 rounded-full border border-amber-300/30 bg-amber-300/10 px-2 py-0.5 text-[10px] text-amber-200/80">
              <Lock className="size-2.5" /> Private
            </span>
          )}

          {showActions && onDelete ? (
            <DropdownMenu.DropdownMenu>
              <DropdownMenu.DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label={`Project actions for ${project.repository_name}`}
                  className="inline-flex size-8 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.02] text-white/55 transition hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                  onClick={(event) => event.stopPropagation()}
                >
                  <MoreHorizontal className="size-4" />
                </button>
              </DropdownMenu.DropdownMenuTrigger>
              <DropdownMenu.DropdownMenuContent align="end" className="w-48 border-white/[0.08] bg-[#111827]/95 text-white">
                <DropdownMenu.DropdownMenuItem asChild>
                  <Link
                    href={`/projects/${project.id}`}
                    className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-white/80 hover:bg-white/[0.05]"
                    onClick={(event) => event.stopPropagation()}
                  >
                    View project
                  </Link>
                </DropdownMenu.DropdownMenuItem>
                {destructiveAction}
              </DropdownMenu.DropdownMenuContent>
            </DropdownMenu.DropdownMenu>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-[10px] text-white/35">
        <FrameworkBadge framework={project.build_configuration?.executable ?? "node"} />
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3" />
          {branch}
        </span>
        {latestDeployment && (
          <DeploymentStatusBadge status={latestDeployment.status} size="sm" />
        )}
        {project.updated_at && (
          <span>Updated {new Date(project.updated_at).toLocaleDateString()}</span>
        )}
      </div>

      {showActions && variant === "dashboard" && latestDeployment && (
        <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
          <Link
            href={`/projects/${project.id}`}
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-cyan-300/70 hover:text-cyan-300"
          >
            View deployments →
          </Link>
          <span className="text-[10px] text-white/30">#{latestDeployment.build_number}</span>
        </div>
      )}
    </article>
  );
}
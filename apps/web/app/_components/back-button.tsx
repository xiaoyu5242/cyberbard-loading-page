import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/shadcn/button";

export function BackButton({ className }: { className?: string }) {
  return (
    <div className={cn("fixed top-4 left-4 z-50 md:top-8 md:left-8", className)}>
      <Button
        asChild
        variant="ghost"
        className="rounded-full bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/50 hover:text-foreground h-10 w-10 p-0 md:h-auto md:w-auto md:px-4 md:py-2"
      >
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden md:inline">Back</span>
        </Link>
      </Button>
    </div>
  );
}

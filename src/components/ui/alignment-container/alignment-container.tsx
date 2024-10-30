import { cn } from "@/utils/utils";

interface IAlignmentContainer {
  children: React.ReactNode;
  className: string;
}

export function AlignmentContainer({
  children,
  className,
}: IAlignmentContainer) {
  return (
    <div className={cn(className, "max-w-7xl mx-auto border border-1")}>
      {children}
    </div>
  );
}

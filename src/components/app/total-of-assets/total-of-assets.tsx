import { cn } from "@/utils/utils";

interface IGrossBalance {
  className?: string;
}

export function TotalOfAssets({ className }: IGrossBalance) {
  const assets = 3;

  return (
    <div
      className={cn(
        className,
        "w-full border h-[121px] p-4 rounded-[26px] bg-white shadow-md"
      )}
    >
      <p className="font-bold">Total de ativos</p>
      <p className="text-lg font-bold text-black">{assets}</p>
    </div>
  );
}

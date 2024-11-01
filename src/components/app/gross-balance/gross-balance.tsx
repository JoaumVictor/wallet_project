import { cn } from "@/utils/utils";

interface IGrossBalance {
  className?: string;
}

export function GrossBalance({ className }: IGrossBalance) {
  const totalValue = 4399;

  return (
    <div
      className={cn(
        className,
        "w-full border h-[121px] p-4 rounded-[26px] bg-white shadow-md"
      )}
    >
      <p className="font-bold">Saldo bruto</p>
      <p className="text-lg font-bold text-black">R$ {totalValue}</p>
    </div>
  );
}

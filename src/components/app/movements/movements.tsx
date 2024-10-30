import { cn } from "@/utils/utils";

interface IGrossBalance {
  className?: string;
}

export function Movements({ className }: IGrossBalance) {
  const buys = 3;
  const sales = 0;

  return (
    <div
      className={cn(
        className,
        "w-full border h-[121px] p-4 rounded-[26px] bg-white shadow-md"
      )}
    >
      <p className="font-bold">Movimentações do mês</p>
      <span className="text-lg font-bold text-black">{`${buys} compras - ${sales} vendas`}</span>
    </div>
  );
}

import { Breadcrumb } from "@/components/app/breadcrumb/breadcrumb";
import { GrossBalance } from "@/components/app/gross-balance/gross-balance";
import { Movements } from "@/components/app/movements/movements";
import { TotalOfAssets } from "@/components/app/total-of-assets/total-of-assets";
import { AlignmentContainer } from "@/components/ui/alignment-container/alignment-container";

export function HomePage() {
  return (
    <AlignmentContainer className="w-full min-h-screen gap-4 p-10 bg-gray-5">
      <Breadcrumb breadcrumbPath={["Meus investimentos"]} />
      <section className="grid grid-cols-3 gap-4">
        <GrossBalance />
        <TotalOfAssets />
        <Movements />
      </section>
    </AlignmentContainer>
  );
}

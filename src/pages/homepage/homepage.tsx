import { AssetsList } from "@/components/app/assets-list/assets-list";
import { Breadcrumb } from "@/components/app/breadcrumb/breadcrumb";
import { Footer } from "@/components/app/footer/footer";
import { GrossBalance } from "@/components/app/gross-balance/gross-balance";
import { MainChart } from "@/components/app/main-chart/main-chart";
import { Movements } from "@/components/app/movements/movements";
import { TotalOfAssets } from "@/components/app/total-of-assets/total-of-assets";
import { AlignmentContainer } from "@/components/ui/alignment-container/alignment-container";

export function HomePage() {
  return (
    <AlignmentContainer className="flex flex-col items-center justify-start w-full min-h-screen gap-4 p-10">
      <Breadcrumb breadcrumbPath={["Meus investimentos"]} />
      <section className="grid w-full grid-cols-3 gap-4">
        <GrossBalance />
        <TotalOfAssets />
        <Movements />
      </section>
      <section className="flex w-full gap-4 h-[520px]">
        <MainChart />
        <AssetsList />
      </section>
      <Footer />
    </AlignmentContainer>
  );
}

import { AssetsList } from "@/components/app/assets-list/assets-list";
import { Breadcrumb } from "@/components/app/breadcrumb/breadcrumb";
import { ChangeLanguage } from "@/components/app/change-language/change-language";
import { Footer } from "@/components/app/footer/footer";
import { GrossBalance } from "@/components/app/gross-balance/gross-balance";
import { MainChart } from "@/components/app/main-chart/main-chart";
import { Movements } from "@/components/app/movements/movements";
import { TotalOfAssets } from "@/components/app/total-of-assets/total-of-assets";
import { AlignmentContainer } from "@/components/ui/alignment-container/alignment-container";
import { useTranslation } from "react-i18next";

export function HomePage() {
  const { t } = useTranslation();
  const breadcrumbPath = [t("private.homepage.breadcrumb.my-investments")];

  return (
    <AlignmentContainer className="flex flex-col items-center justify-start w-full min-h-screen gap-4 p-4 md:p-10">
      <ChangeLanguage />
      <Breadcrumb breadcrumbPath={breadcrumbPath} />
      <section className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
        <GrossBalance />
        <TotalOfAssets />
        <Movements />
      </section>
      <section className="flex flex-col lg:flex-wrap lg:flex-row w-full gap-4 min-h-[520px] pb-10">
        <MainChart />
        <AssetsList />
      </section>
      <Footer />
    </AlignmentContainer>
  );
}

import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="items-center justify-center w-full py-4">
      <p className="font-bold text-center text-black">
        2024 - {t("private.homepage.footer.title")}
      </p>
    </footer>
  );
}

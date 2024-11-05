import { useTranslation } from "react-i18next";

export function ChangeLanguage() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center justify-center gap-10">
      <button
        className="flex items-center justify-center gap-1 font-semibold text-black"
        onClick={() => changeLanguage("en")}
      >
        <img
          className="w-8"
          src={require("@/assets/imgs/en-flag.png")}
          alt="br flag"
        />
        English
      </button>
      <button
        className="flex items-center justify-center gap-1 font-semibold text-black"
        onClick={() => changeLanguage("pt")}
      >
        <img
          className="w-8"
          src={require("@/assets/imgs/br-flag.png")}
          alt="br flag"
        />
        Português
      </button>
    </div>
  );
}

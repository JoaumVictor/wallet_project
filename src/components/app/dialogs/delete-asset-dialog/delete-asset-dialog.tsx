import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button/button";
import { useTranslation } from "react-i18next";
import { usePortfolio } from "@/context/assets-context";

interface IDeleteAssetDialog {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  assetName: string;
}

export function DeleteAssetDialog({
  isOpen,
  setIsOpen,
  assetName,
}: IDeleteAssetDialog) {
  const { t } = useTranslation();
  const { handleDeleteAsset } = usePortfolio();

  const confirmDelete = () => {
    handleDeleteAsset(assetName);
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <Dialog.Content
          className="fixed inset-0 flex items-center justify-center p-4"
          aria-labelledby="modal-title"
        >
          <div className="flex flex-col items-center justify-center w-full max-w-[500px] gap-10 p-10 bg-white rounded-xl">
            <Dialog.Title id="modal-title" className="text-xl font-bold">
              {t("private.homepage.assets-list.dialogs.delete-asset.title")}{" "}
              {assetName}?
            </Dialog.Title>
            <div className="flex items-center w-full justify-evenly">
              <Button
                onClick={() => setIsOpen(false)}
                variant="outline"
                className=""
                size="md"
              >
                {t("common.cancel")}
              </Button>
              <Button
                onClick={confirmDelete}
                variant="error"
                className=""
                size="md"
              >
                {t("common.remove")}
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

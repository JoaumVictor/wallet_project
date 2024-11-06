/* eslint-disable react-hooks/exhaustive-deps */
import Input from "@/components/shared/input/input";
import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button/button";
import { FaPlus } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { usePortfolio } from "@/context/assets-context";
import { AssetData } from "@/types/assets";
import { useEffect } from "react";
import { localDateInStringFormat } from "@/utils/utils";

interface ISaleAssetDialog {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  asset: AssetData;
}

export function SaleAssetDialog({
  isOpen,
  setIsOpen,
  asset,
}: ISaleAssetDialog) {
  const { t } = useTranslation();
  const { handleRemoveAsset } = usePortfolio();

  const validationSchema = Yup.object().shape({
    assetName: Yup.string().required(
      t("private.homepage.assets-list.dialogs.add-asset.asset-name-required")
    ),
    purchaseDate: Yup.date().required(
      t("private.homepage.assets-list.dialogs.add-asset.asset-date-required")
    ),
    quantity: Yup.number()
      .required(
        t(
          "private.homepage.assets-list.dialogs.add-asset.asset-quantity-required"
        )
      )
      .positive(
        t(
          "private.homepage.assets-list.dialogs.add-asset.asset-quantity-positive"
        )
      )
      .max(
        asset.quantity,
        t(
          "private.homepage.assets-list.dialogs.sale-asset.asset-quantity-max",
          { availableQuantity: asset.quantity }
        )
      )
      .integer(
        t(
          "private.homepage.assets-list.dialogs.add-asset.asset-quantity-integer"
        )
      ),
  });

  const formik = useFormik({
    initialValues: {
      assetName: "",
      purchaseDate: "",
      quantity: "1",
    },
    validationSchema,
    onSubmit: (values) => {
      handleRemoveAsset(values.assetName, Number(values.quantity));
      setIsOpen(false);
    },
  });

  useEffect(() => {
    const fillOutForm = () => {
      formik.setFieldValue("assetName", asset.name);
      formik.setFieldValue("purchaseDate", localDateInStringFormat());
    };
    fillOutForm();
  }, []);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <Dialog.Content
          className="fixed inset-0 flex items-center justify-center p-4"
          aria-labelledby="modal-title"
        >
          <form
            onSubmit={formik.handleSubmit}
            className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
          >
            <Dialog.Title id="modal-title" className="text-xl font-bold">
              {t("private.homepage.assets-list.dialogs.sale-asset.title")}
            </Dialog.Title>
            <div className="flex flex-col gap-4 mt-4">
              <Input
                label={t(
                  "private.homepage.assets-list.dialogs.add-asset.asset-name"
                )}
                placeholder={t(
                  "private.homepage.assets-list.dialogs.add-asset.asset-name-placeholder"
                )}
                value={formik.values.assetName}
                onChange={() => null}
                onBlur={formik.handleBlur}
                name="assetName"
              />

              <div>
                <Input
                  label={t(
                    "private.homepage.assets-list.dialogs.add-asset.asset-date"
                  )}
                  type="date"
                  placeholder={t(
                    "private.homepage.assets-list.dialogs.add-asset.asset-date-placeholder"
                  )}
                  value={formik.values.purchaseDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="purchaseDate"
                />
                {formik.touched.purchaseDate && formik.errors.purchaseDate && (
                  <p className="ml-2 text-sm text-red-500">
                    {formik.errors.purchaseDate}
                  </p>
                )}
              </div>

              <div>
                <Input
                  label={t(
                    "private.homepage.assets-list.dialogs.add-asset.asset-quantity"
                  )}
                  type="number"
                  placeholder={t(
                    "private.homepage.assets-list.dialogs.add-asset.asset-quantity-placeholder"
                  )}
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="quantity"
                />
                {formik.touched.quantity && formik.errors.quantity && (
                  <p className="ml-2 text-sm text-red-500">
                    {formik.errors.quantity}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end mt-4">
                <Button
                  className="!text-[12px]"
                  leftIcon={<FaPlus className="mr-2 text-[11px]" />}
                  size="sm"
                >
                  {t(
                    "private.homepage.assets-list.dialogs.sale-asset.add-sale"
                  )}
                </Button>
              </div>
            </div>

            <Dialog.Close asChild>
              <button className="absolute transition-all top-4 right-4 hover:scale-125">
                <IoMdClose className="text-[26px]" />
              </button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

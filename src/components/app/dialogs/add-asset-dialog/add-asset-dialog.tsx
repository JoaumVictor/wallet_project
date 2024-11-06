/* eslint-disable react-hooks/exhaustive-deps */
import Input from "@/components/shared/input/input";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "@/components/shared/select/select";
import { Button } from "@/components/ui/button/button";
import { FaPlus } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { usePortfolio } from "@/context/assets-context";
import { localDateInStringFormat } from "@/utils/utils";

interface IAddAssetDialog {
  children: React.ReactNode;
}

export function AddAssetDialog({ children }: IAddAssetDialog) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { handleAddAsset } = usePortfolio();

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
      .integer(
        t(
          "private.homepage.assets-list.dialogs.add-asset.asset-quantity-integer"
        )
      ),
    price: Yup.number()
      .required(
        t("private.homepage.assets-list.dialogs.add-asset.asset-price-required")
      )
      .positive(
        t("private.homepage.assets-list.dialogs.add-asset.asset-price-positive")
      ),
    assetType: Yup.string().required(
      t("private.homepage.assets-list.dialogs.add-asset.stock-type-required")
    ),
  });

  const formik = useFormik({
    initialValues: {
      assetName: "",
      purchaseDate: "",
      quantity: "1",
      price: "",
      assetType: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const data = {
        code: values.assetName.toUpperCase().slice(0, 2),
        name: values.assetName,
        type: values.assetType,
        value: Number(values.price),
        quantity: Number(values.quantity),
      };
      handleAddAsset(data);
      setIsOpen(false);
      formik.setErrors({});
    },
  });

  const selectOptions = [
    {
      value: "Ação",
      label: t("private.homepage.assets-list.dialogs.add-asset.stock"),
    },
    {
      value: "Fundo Imobiliário",
      label: t("private.homepage.assets-list.dialogs.add-asset.fii"),
    },
    {
      value: "Renda Fixa",
      label: t("private.homepage.assets-list.dialogs.add-asset.fixed-income"),
    },
    {
      value: "Criptomoeda",
      label: t("private.homepage.assets-list.dialogs.add-asset.crypto"),
    },
  ];

  useEffect(() => {
    const fillOutForm = () => {
      formik.setFieldValue("purchaseDate", localDateInStringFormat());
      formik.setErrors({});
    };
    fillOutForm();
  }, []);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
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
              {t("private.homepage.assets-list.dialogs.add-asset.title")}
            </Dialog.Title>
            <div className="flex flex-col gap-4 mt-4">
              <div>
                <Input
                  label={t(
                    "private.homepage.assets-list.dialogs.add-asset.asset-name"
                  )}
                  placeholder={t(
                    "private.homepage.assets-list.dialogs.add-asset.asset-name-placeholder"
                  )}
                  value={formik.values.assetName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="assetName"
                />
                {formik.touched.assetName && formik.errors.assetName && (
                  <p className="ml-2 text-sm text-red-500">
                    {formik.errors.assetName}
                  </p>
                )}
              </div>

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

              <div>
                <Input
                  label={t(
                    "private.homepage.assets-list.dialogs.add-asset.asset-price"
                  )}
                  type="number"
                  placeholder={t(
                    "private.homepage.assets-list.dialogs.add-asset.asset-price-placeholder"
                  )}
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="price"
                  leftCurrency="R$"
                />
                {formik.touched.price && formik.errors.price && (
                  <p className="ml-2 text-sm text-red-500">
                    {formik.errors.price}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Select
                  label={t(
                    "private.homepage.assets-list.dialogs.add-asset.stock-type"
                  )}
                  placeholder={t(
                    "private.homepage.assets-list.dialogs.add-asset.select-placeholder"
                  )}
                  name="assetType"
                  value={formik.values.assetType}
                  options={selectOptions}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.assetType && formik.errors.assetType && (
                  <p className="ml-2 text-sm text-red-500">
                    {formik.errors.assetType}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between mt-4">
                <p className="text-sm font-medium text-gray-700">
                  {t("private.homepage.assets-list.dialogs.add-asset.total")} R${" "}
                  {formik.values.price && formik.values.quantity
                    ? (
                        Number(formik.values.price) *
                        Number(formik.values.quantity)
                      ).toFixed(2)
                    : "0.00"}
                </p>
                <Button
                  className="!text-[12px]"
                  leftIcon={<FaPlus className="mr-2 text-[11px]" />}
                  size="sm"
                >
                  {t("private.homepage.assets-list.dialogs.add-asset.button")}
                </Button>
              </div>
            </div>

            <Dialog.Close asChild>
              <button
                onClick={() => formik.setErrors({})}
                className="absolute transition-all top-4 right-4 hover:scale-125"
              >
                <IoMdClose className="text-[26px]" />
              </button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

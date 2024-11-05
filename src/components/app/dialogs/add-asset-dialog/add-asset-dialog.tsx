import Input from "@/components/shared/input/input";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "@/components/shared/select/select";
import { Button } from "@/components/ui/button/button";
import { FaPlus } from "react-icons/fa6";

interface IAddAssetDialog {
  children: React.ReactNode;
}

const validationSchema = Yup.object().shape({
  assetName: Yup.string().required("Ticket do ativo é obrigatório"),
  purchaseDate: Yup.date().required("Data de compra é obrigatória"),
  quantity: Yup.number()
    .required("Quantidade é obrigatória")
    .positive("Quantidade deve ser maior que zero")
    .integer("Quantidade deve ser um número inteiro"),
  price: Yup.number()
    .required("Cotação é obrigatória")
    .positive("Cotação deve ser maior que zero"),
  assetType: Yup.string().required("Tipo de ativo é obrigatório"),
});

export function AddAssetDialog({ children }: IAddAssetDialog) {
  const [isOpen, setIsOpen] = useState(false);

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
      console.log("Ativo adicionado:", values);
      setIsOpen(false);
    },
  });

  const selectOptions = [
    { value: "Ação", label: "Ação" },
    { value: "Fundo Imobiliário", label: "Fundo Imobiliário" },
    { value: "Renda Fixa", label: "Renda Fixa" },
    { value: "Criptomoeda", label: "Criptomoeda" },
  ];

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
              Adicionar ativo
            </Dialog.Title>
            <div className="flex flex-col gap-4 mt-4">
              <div>
                <Input
                  label="Ticker do ativo"
                  placeholder="Digite o nome do ativo"
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
                  label="Data de Compra"
                  type="date"
                  placeholder="Selecione a data"
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
                  label="Quantidade"
                  type="number"
                  placeholder="1"
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
                  label="Cotação"
                  type="number"
                  placeholder="00,00"
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
                  label="Tipo de Ativo"
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
                  Total: R${" "}
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
                  Adicionar Ativo
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

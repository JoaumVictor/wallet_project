import { IoHomeOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

interface IBreadcrumb {
  breadcrumbPath: string[];
}

export function Breadcrumb({ breadcrumbPath }: IBreadcrumb) {
  return (
    <div className="flex flex-row items-center gap-4 p-4 my-4 bg-white rounded-md shadow-md">
      <IoHomeOutline />
      {breadcrumbPath?.map((each: string) => (
        <>
          <IoIosArrowForward />
          <p className="text-sm">{each}</p>
        </>
      ))}
    </div>
  );
}

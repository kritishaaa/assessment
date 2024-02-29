import { useState } from "react";
import ProductCategoriesTable from "./component/ProductCategoriesTable";
import SubHeader from "./component/SubHeader";
import AddProductCategories from "./component/AddProductCategories";

const ProductCategories = () => {
  const [isAddProductCategories, setIsAddProductCategories] = useState(false);

  return (
    <>
      <SubHeader
        setIsAddProductCategories={setIsAddProductCategories}
        isAddProductCategories={isAddProductCategories}
      />
      {isAddProductCategories ? (
        <AddProductCategories
          setIsAddProductCategories={setIsAddProductCategories}
        />
      ) : (
        <>
          <ProductCategoriesTable />
        </>
      )}
    </>
  );
};

export default ProductCategories;

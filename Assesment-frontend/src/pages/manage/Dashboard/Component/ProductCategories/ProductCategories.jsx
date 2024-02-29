import { useState } from "react";
import ProductCategoriesTable from "./component/ProductCategoriesTable";
import SubHeader from "./component/SubHeader";
import AddProductCategories from "./component/AddEditProductCategories";
import { useParams } from "react-router-dom";
const ProductCategories = () => {
  const { id } = useParams();

  const [isAddProductCategories, setIsAddProductCategories] = useState(false);

  return (
    <>
      <SubHeader
        setIsAddProductCategories={setIsAddProductCategories}
        isAddProductCategories={isAddProductCategories}
        isEdit={Boolean(id)}
      />
      {isAddProductCategories || id ? (
        <AddProductCategories
          setIsAddProductCategories={setIsAddProductCategories}
          id={id}
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

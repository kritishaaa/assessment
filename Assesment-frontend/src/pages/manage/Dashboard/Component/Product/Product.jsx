import { useState } from "react";
import ProductTable from "./component/ProductTable";
import SubHeader from "./component/SubHeader";
import AddEditProduct from "./component/AddEditProduct";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();

  const [isAddProduct, setIsAddProduct] = useState(false);
  return (
    <>
      <SubHeader
        setIsAddProduct={setIsAddProduct}
        isAddProduct={isAddProduct}
        isEdit={Boolean(id)}
      />
      {isAddProduct || id ? (
        <AddEditProduct
          setIsAddProduct={setIsAddProduct}
          isEdit={Boolean(id)}
          id={id}
        />
      ) : (
        <>
          <ProductTable />
        </>
      )}
    </>
  );
};

export default Product;

import { useState } from "react";
import ProductTable from "./component/ProductTable";
import SubHeader from "./component/SubHeader";
import AddProduct from "./component/AddProduct";

const Product = () => {
  const [isAddProduct, setIsAddProduct] = useState(false);
  return (
    <>
      {isAddProduct ? (
        <AddProduct setIsAddProduct={setIsAddProduct} />
      ) : (
        <>
          <SubHeader setIsAddProduct={setIsAddProduct} />
          <ProductTable />
        </>
      )}
    </>
  );
};

export default Product;

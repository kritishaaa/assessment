import React, { useEffect, useState } from "react";
import Product from "./Component/Product/Product";
import ProductCategories from "./Component/ProductCategories/ProductCategories";
import { useNavigate, useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("product-categories");
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get("editCategories") === "true") {
      setSelectedTab("product-categories");
    } else if (searchParams.get("editProduct") === "true") {
      setSelectedTab("product");
    }
  }, [searchParams]);

  function handleTabChange(tab) {
    setSelectedTab(tab);
    navigate(`/dashboard/`);
  }

  return (
    <>
      <nav className="bg-gray-800 py-4">
        <div className="container mx-auto flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={() => handleTabChange("product-categories")}
          >
            Category
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleTabChange("product")}
          >
            Product
          </button>
        </div>
      </nav>
      {selectedTab === "product-categories" ? (
        <ProductCategories />
      ) : (
        <Product />
      )}
    </>
  );
};

export default Dashboard;

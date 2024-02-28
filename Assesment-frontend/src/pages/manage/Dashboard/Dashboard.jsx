import React, { useState } from "react";
import Product from "./Component/Product/Product";
import ProductCategories from "./Component/ProductCategories/ProductCategories";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("product-categories");
  return (
    <>
      <nav className="bg-gray-800 py-4">
        <div className="container mx-auto flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={() => setSelectedTab("product-categories")}
          >
            Category
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setSelectedTab("product")}
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

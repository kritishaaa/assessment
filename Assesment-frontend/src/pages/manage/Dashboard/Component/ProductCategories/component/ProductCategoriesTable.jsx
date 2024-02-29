import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "src/config/axios.config";
import { toast } from "react-toastify";

const ProductCategoriesTable = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const notify = (msg) => toast(msg);

  async function getProductCategories() {
    try {
      const { data: productCategoriesData } = await axiosConfig.get(
        "/admin/product-categories",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(productCategoriesData);
      setData(productCategoriesData?.data ?? []);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProductCategory(id) {
    try {
      await axiosConfig.delete(`/admin/product-categories/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      getProductCategories();
      notify("Product category deleted successfully!");
    } catch (error) {
      console.log(error);
      notify("Error deleting product category!");
    }
  }
  
  React.useEffect(() => {
    getProductCategories();
  }, []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page

  // Calculate indexes for pagination
  const lastIndex = currentPage * pageSize;
  const firstIndex = lastIndex - pageSize;
  const currentData = data;

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentData.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50 ">
              <td className="px-6 py-4 whitespace-nowrap">{row.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => navigate(`/dashboard/${row.id}/?editCategories=true`)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-900 mx-2"
                  onClick={() => deleteProductCategory(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={lastIndex >= data.length}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default ProductCategoriesTable;

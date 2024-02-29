import React, { useState, useEffect } from "react";
import axiosConfig from "src/config/axios.config";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const AddEditProduct = ({ setIsAddProduct, id, isEdit }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [categories, setCategories] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);

  const handleAddProductCategories = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosConfig.post(
        "/admin/products",
        {
          name,
          slug,
          description,
          quantity,
          price,
          categories: categories.map((category) => category.id),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response);
      setIsAddProduct(false);
      navigate("/dashboard/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateProductCategories = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosConfig.put(
        `/admin/products/${id}`,
        {
          name,
          slug,
          description,
          quantity,
          price,
          categories: categories.map((category) => category.id),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response);
      setIsAddProduct(false);
      navigate("/dashboard/");
    } catch (error) {
      console.error(error);
    }
  };

  const getProductById = async () => {
    const { data } = await axiosConfig.get(`/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setName(data?.data.name);
    setSlug(data?.data.slug);
    setDescription(data?.data.description);
    setQuantity(data?.data.quantity);
    setPrice(data?.data.price);
    setCategories(data?.data.categories);
  };

  const getAllCategories = async () => {
    const { data } = await axiosConfig.get("/admin/product-categories/all", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setAvailableCategories(data.data);
  };

  useEffect(() => {
    if (isEdit && id) {
      getProductById();
    }
    getAllCategories();
  }, []);

  return (
    <section className="container mx-auto">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          // onSubmit={
          //   isEdit ? handleUpdateProductCategories : handleAddProductCategories
          // }
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Slug
            </label>
            <div className="mt-2">
              <input
                id="slug"
                name="slug"
                type="text"
                autoComplete="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                autoComplete="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Quantity
            </label>
            <div className="mt-2">
              <input
                id="quantity"
                name="quantity"
                type="number"
                autoComplete="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Price
            </label>
            <div className="mt-2">
              <input
                id="price"
                name="price"
                type="number"
                autoComplete="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="categories"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Categories
            </label>
            <div className="mt-2">
              <Select
                id="categories"
                name="categories"
                options={availableCategories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                isMulti
                value={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                onChange={(selectedOptions) =>
                  setCategories(
                    selectedOptions.map((option) => ({
                      id: option.value,
                      name: option.label,
                    }))
                  )
                }
              />
            </div>
          </div>
          <div>
            <button
              // type="submit"
              onClick={
                isEdit
                  ? handleUpdateProductCategories
                  : handleAddProductCategories
              }
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save 📥
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddEditProduct;

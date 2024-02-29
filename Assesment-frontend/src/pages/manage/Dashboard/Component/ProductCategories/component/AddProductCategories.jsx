import { useState } from "react";
import axiosConfig from "src/config/axios.config";

const AddProductCategories = ({ setIsAddProductCategories }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const handleAddProductCategories = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosConfig.post("/admin/product-categories", {
        name,
        slug,
      });
      console.log(response);
      setIsAddProductCategories(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="container mx-auto">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
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
                type="name"
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
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Slug
            </label>
            <div className="mt-2">
              <input
                id="slug"
                name="slug"
                type="slug"
                autoComplete="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              // type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleAddProductCategories}
            >
              Save 📥
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProductCategories;

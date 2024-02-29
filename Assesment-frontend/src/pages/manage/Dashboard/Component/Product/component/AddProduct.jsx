const AddProduct = ({ setIsAddProduct }) => {
  return (
    <section>
      <div className="container mx-auto my-8 flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={() => setIsAddProduct(false)}
        >
          ⬅️ Back
        </button>
        <h1 className="font-medium text-2xl">Add Product</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={() => setIsAddProduct(false)}
        >
          Save 📥
        </button>
      </div>
    </section>
  );
};

export default AddProduct;

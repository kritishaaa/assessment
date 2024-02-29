const SubHeader = ({ setIsAddProduct }) => {
  return (
    <div className="container mx-auto my-8 flex justify-between">
      <h1 className="font-medium text-2xl">Product</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
        onClick={() => setIsAddProduct(true)}
      >
        Add Product
      </button>
    </div>
  );
};

export default SubHeader;

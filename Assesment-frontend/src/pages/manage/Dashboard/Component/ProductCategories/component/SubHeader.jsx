const SubHeader = ({ setIsAddProductCategories, isAddProductCategories }) => {
  return (
    <div className="container mx-auto my-8 flex justify-between">
      {isAddProductCategories && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={() => setIsAddProductCategories(false)}
        >
          ⬅️ Back
        </button>
      )}
      <h1 className="font-medium text-2xl">
        {isAddProductCategories && "Add"} Product Categories
      </h1>
      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 ${
          isAddProductCategories && " invisible"
        }`}
        onClick={() => setIsAddProductCategories(!isAddProductCategories)}
      >
        {isAddProductCategories ? "Save 📥" : "Add Product Categories"}
      </button>
    </div>
  );
};

export default SubHeader;

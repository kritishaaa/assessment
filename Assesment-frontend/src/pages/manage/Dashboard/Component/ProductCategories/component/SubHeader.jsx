import { useNavigate } from "react-router-dom";
const SubHeader = ({
  setIsAddProductCategories,
  isAddProductCategories,
  isEdit,
}) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto my-8 flex justify-between">
      {(isAddProductCategories || isEdit) && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={() => {
            setIsAddProductCategories(false);
            navigate("/dashboard/");
          }}
        >
          ⬅️ Back
        </button>
      )}
      <h1 className="font-medium text-2xl">
        {isAddProductCategories && "Add "}
        {isEdit && "Edit "}
        Product Categories
      </h1>
      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 ${
          (isAddProductCategories || isEdit) && " invisible"
        }`}
        onClick={() => setIsAddProductCategories(!isAddProductCategories)}
      >
        {isAddProductCategories ? "Save 📥" : "Add Product Categories"}
      </button>
    </div>
  );
};

export default SubHeader;

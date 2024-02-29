import { useNavigate } from "react-router-dom";
const SubHeader = ({ setIsAddProduct, isAddProduct, isEdit }) => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto my-8 flex justify-between">
      {(isAddProduct || isEdit) && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={() => {
            setIsAddProduct(false);
            navigate("/dashboard/");
          }}
        >
          ⬅️ Back
        </button>
      )}
      <h1 className="font-medium text-2xl">
        {isAddProduct && "Add "}
        {isEdit && "Edit "}Product
      </h1>
      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 ${
          (isAddProduct || isEdit) && " invisible"
        }`}
        onClick={() => setIsAddProduct(true)}
      >
        Add Product
      </button>
    </div>
  );
};

export default SubHeader;

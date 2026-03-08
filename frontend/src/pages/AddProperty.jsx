import React from "react";
import { Link } from "react-router-dom";

function AddProperty() {
  return (
    <Link
      to="/add-property"
      className="inline-flex items-center justify-center rounded-md border border-accent bg-transparent px-4 py-2 text-sm font-semibold text-accent transition-all duration-200 hover:bg-accent hover:text-primary shadow-sm"
    >
      + Add Property
    </Link>
  );
}

export default AddProperty;

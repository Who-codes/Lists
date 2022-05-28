import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const Lists = ({ list }) => {
  return (
    <div className="grocery-list">
      {list.map((item) => {
        const { id, title } = item;
        return (
          <article className="grocery-item" key={id}>
            <p className="title">{title}</p>
            <button className="container">
              <button className="edit-btn">
                <FaEdit />
              </button>
              <button className="delete-btn">
                <FaTrash />
              </button>
            </button>
          </article>
        );
      })}
    </div>
  );
};

export default Lists;

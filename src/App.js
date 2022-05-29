import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import Lists from "./List";

const getlocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getlocalStorage());
  const [isEditing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //deal with alert
      showAlert(true, "enter item name", "danger");
    } else if (name && isEditing) {
      //deal with edit
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...list, title: name };
          }
          return item;
        })
      );

      setName("");
      setEditing(false);
      setEditId(null);
      showAlert(true, "vslue changed", "success");
    } else {
      showAlert(true, "item added successfully", "success");
      const newList = { id: new Date().getTime().toString(), title: name };
      setList((prevList) => [...prevList, newList]);
      setName("");
    }
  };

  const showAlert = (show = false, msg, type) => {
    setAlert({ show, msg, type });
  };

  const clearList = () => {
    showAlert(true, "empty list", "danger");
    setList([]);
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => id === item.id);
    setEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <div className="grocery-container">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <h3>Grocery list</h3>
          <div className="form-control">
            <input
              type="text"
              className="grocery"
              placeholder="eg. Milk"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="submit-btn">{isEditing ? "edit" : "add"}</button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="grocery-container">
            <Lists list={list} removeItem={removeItem} editItem={editItem} />
            <button className="clear-btn" onClick={clearList}>
              clear list
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;

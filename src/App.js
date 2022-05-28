import React, { useState } from "react";
import Alert from "./Alert";
import Lists from "./List";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //deal with alert
    } else if (name && isEditing) {
      //deal with edit
    } else {
      //show alert
      const newList = { id: new Date().getTime().toString(), title: name };
      setList((prevList) => [...prevList, newList]);
      setName("");
    }
  };
  return (
    <section className="section-center">
      <div className="grocery-container">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && <Alert />}
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
        <Lists list={list} />
        <button className="clear-btn">clear list</button>
      </div>
    </section>
  );
}

export default App;

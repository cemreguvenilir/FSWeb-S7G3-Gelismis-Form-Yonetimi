import "./App.css";
import { useState } from "react";
import Form from "./components/Form";
import React from "react";

function App() {
  const [editingMember, setEditingMember] = useState();
  const [editingOrder, setEditingOrder] = useState();
  const [members, setMembers] = useState([
    {
      id: 17,
      name: "Cemre",
      surname: "Güvenilir",
      email: "guvenilircemre@gmail.com",
      password: "234",
    },
    {
      id: 18,
      name: "Melih",
      surname: "Şeker",
      email: "sekeroon@gmail.com",
      password: "123",
    },
  ]);
  function addMember(newMember) {
    console.log("newMember", newMember);
    if (editingOrder !== undefined) {
      const upDatedMembers = [...members];
      upDatedMembers.splice(editingOrder, 1, newMember);
      setMembers(upDatedMembers);
    } else {
      setMembers([...members, newMember]);
    }
    setEditingOrder();
  }

  function editForm(member, order) {
    setEditingMember(member);
    setEditingOrder(order);
  }

  return (
    <div className="App App-header">
      <ul>
        {members.map((member, i) => {
          return (
            <li key={i}>
              <a className="App-link" href={"mailto:${member.email} "}>
                {member.id} {member.name} {member.surname}
              </a>{" "}
              <button onClick={() => editForm(member, i)} className="edit">
                Edit
              </button>
            </li>
          );
        })}
      </ul>
      <Form addMember={addMember} editMode={editingMember} />
    </div>
  );
}

export default App;

import React, { useState, Fragment, useEffect } from "react";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";
import UserTable from "./tables/UserTable";

const firebase = require("./firebase").getInstance();
var demosRef = firebase.database().ref("demos");

const App = () => {
  var usersData = [];

  const initialFormState = { id: null, name: "", username: "" };

  // Setting state
  const [users, setUsers] = useState(usersData);
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    return () => {
      console.log("will unmount");
    };
  }, []);

  useEffect(() => {
    firebase
      .database()
      .ref("/demos")
      .child("users")
      .on("value", snap => {
        if (snap.val()) {
          // this.setState({ usersData: Object.values(snap.val()) });
          // console.log(Object.values(snap.val()));

          setUsers(Object.values(snap.val()));
          // usersData = Object.values(snap.val());
        }
      });
    console.log("mounted");
  }, []);

  /*
  
    */

  // CRUD operations
  const addUser = user => {
    user.id = users.length + 1;
    // setUsers([...users, user]);

    // setUsers({ users: [] });

    var pushedRef = firebase
      .database()
      .ref("/demos/users")
      .push(user);
    console.log(pushedRef.key);

    /*
    firebase
      .database()
      .ref("/demos")
      .child("users")
      .once("value", snap => {
        if (snap.val()) {
          // this.setState({ usersData: Object.values(snap.val()) });
          console.log(Object.values(snap.val()));

          setUsers(Object.values(snap.val()));
        }
      });
      */

    // getData();

    console.log(users);
  };

  const deleteUser = id => {
    setEditing(false);

    demosRef
      .child("users")
      .orderByChild("id")
      .equalTo(id)
      .once("value", function(snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function(data) {
          console.log(data.key);
          demosRef
            .child("users")
            .child(data.key)
            .remove();
        });
      });
    setUsers(users.filter(user => user.id !== id));
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);

    demosRef
      .child("users")
      .orderByChild("id")
      .equalTo(id)
      .once("value", function(snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function(data) {
          console.log(data.key);
          // demosRef
          //   .child("users")
          //   .child(data.key)
          //   .remove();

          demosRef
            .child("users")
            .child(data.key)
            // .update({ dateOfBirth: "Hello" })
            .update(updatedUser);
        });
      });

    setUsers(users.map(user => (user.id === id ? updatedUser : user)));
  };

  const editRow = user => {
    setEditing(true);

    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  const getData = () => {
    firebase
      .database()
      .ref("/demos")
      .child("users")
      .once("value", snap => {
        if (snap.val()) {
          // this.setState({ usersData: Object.values(snap.val()) });
          console.log(Object.values(snap.val()));

          setUsers(Object.values(snap.val()));
        }
      });
  };

  return (
    <div className="container">
      <h1>Mannir Esystems Limited</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <Fragment>
              <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </Fragment>
          ) : (
            <Fragment>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </Fragment>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
};

export default App;

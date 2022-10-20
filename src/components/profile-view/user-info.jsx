import React from "react";

function UserInfo({ email, name }) {
  return (
    <>
      <h4>Your Info</h4>
      <p>Name:</p>
      <p> {name}</p>
      <p>e-mail:</p>
      <p> {email}</p>
    </>
  );
}

export default UserInfo;

import React from "react";
import { useParams } from "react-router-dom";

function User() {
  const { userId } = useParams();
  return <div>Hey meraha {userId} User</div>;
}

export default User;

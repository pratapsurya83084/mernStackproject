import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AppContext from "../context/AppContext";
import { toast ,ToastContainer} from "react-toastify";
const UserList = () => {
  const [userList, setUserList] = useState([]);
  const {deletUserByid}=useContext(AppContext)
  // console.log(userList);
const url="http://localhost:1000/api"
// "https://mernstack1stproject-1.onrender.com/api"
  //get all user List
  const getAllUserList = async () => {
    const api = await axios.get(`${url}/user/allusers`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("all user list : ", api.data);

    setUserList(api.data.users);
  };
  useEffect(() => {
    getAllUserList();
  }, []);



  // Function to handle delete action
  const handleDelete =async (id) => {
   const deleteUser=await deletUserByid(id)
  //  console.log(deleteUser.success)
   if (deleteUser.sucess==true) {
    toast.success("user deleted successfully")
   }else{
    toast.error("failed delete") 
  }

  };

  return (
    <div className="container my-4">
      <ToastContainer/>
      <h2 className="text-center mb-4">User List</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Sr. No</th>
              <th>Username</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => (
              <tr key={index+1}>
                <td>{index + 1}</td>
                <td>{user.name
                }</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;

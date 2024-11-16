import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { getAllUsers } from "../../../../services/axios.GetMethods";
import { blockUser, unblockUser } from "../../../../services/axios.PutMethods";
import { useLoading } from "../../../../contexts/LoadingContext";
import { FaSpinner } from "react-icons/fa";


const UsersList: React.FC = () => {
  interface UserList {
    _id: string;
    Photo: string | any;
    username: string;
    email: string;
    password: string;
    role: string;
    isBlocked: boolean;
  }

  const { setLoading } = useLoading();
  const [data, setData] = useState<UserList[]>([]);
  const [searchName, setSearchName] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filteredData, setFilteredData] = useState<UserList[]>([]);
  const [loadingState, setLoadingState] = useState<{ [key: string]: boolean }>({});

  const tableHeading = "USER LIST";
  const tableHeaders = [
    "ID",
    "Photo",
    "Name",
    "Email",
    "Role",
    "Status",
    "Operation",
  ];

  //* ---------------- Fetch users on component mount -------------------
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const result = await getAllUsers();
        if (Array.isArray(result.data.data.users)) {
          const dataArray: UserList[] = result.data.data.users as UserList[];
          setData(dataArray);
          setFilteredData(dataArray); // Set initial filtered data
        }
      } catch (error: any) {
        console.error("Failed to fetch users:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  //* -------------- Blocking/unblocking users -------------------
  const blockUnblockUser = async (userId: string, isBlocked: boolean) => {
    try {
      setLoadingState((prev) => ({ ...prev, [userId]: true }));
      if (isBlocked) {
        await unblockUser(userId);
      } else {
        await blockUser(userId);
      }
      // Refresh the user list after blocking/unblocking
      const result = await getAllUsers();
      if (Array.isArray(result.data.data.users)) {
        setData(result.data.data.users);
        setFilteredData(result.data.data.users);
      }
    } catch (error: any) {
      console.error("Failed to block/unblock user:", error.message);
    } finally {
      setLoadingState((prev) => ({ ...prev, [userId]: false }));
    }
  };

  //* ------------------ Filter data based on searchrole ----------------------
  useEffect(() => {
    const filtered = data.filter(
      (user) =>
        user.username.toLowerCase().includes(searchName.toLowerCase()) &&
        (filterRole ? user.role === filterRole : true)
    );
    setFilteredData(filtered);
  }, [searchName, filterRole, data]);

  //*  -------------- Map rows for table ---------------------------
  const rows = filteredData.map((user, index) => ({
    ID: index + 1,
    Photo: user.Photo ? (
      <img
        src={user.Photo}
        alt={user.username}
        className="w-12 h-12 rounded-full"
      />
    ) : (
      "No Image"
    ),
    Name: user.username,
    Email: user.email,
    Role: user.role,
    Status: user.isBlocked ? "Blocked" : "Active",
    Operation: user.isBlocked ? (
      <button
        className={`px-3 py-1 rounded-sm w-24 text-white ${
          loadingState[user._id] ? "" : "bg-green-700"
        }`}
        onClick={() => blockUnblockUser(user._id, true)}
        disabled={loadingState[user._id]}
      >
        {loadingState[user._id] ? (
          <FaSpinner className="animate-spin mx-auto text-black" />
        ) : (
          "unblock"
        )}
      </button>
    ) : (
      <button
        className={`px-3 py-1 rounded-sm w-24 text-white ${
          loadingState[user._id] ? "" : "bg-red-800"
        }`}
        onClick={() => blockUnblockUser(user._id, false)}
        disabled={loadingState[user._id]}
      >
        {loadingState[user._id] ? (
          <FaSpinner className="animate-spin mx-auto text-black" />
        ) : (
          "block"
        )}
      </button>
    ),
  }));

  return (
    <div className="my-6">
      <Table
        tableHeading = {tableHeading}
        headers = {tableHeaders}
        rows = {rows}
        searchName = {searchName}
        setSearchName = {setSearchName}
        filterRole = {filterRole}
        setFilterRole = {setFilterRole}
      />
    </div>
  );
};



export default UsersList;

// UserActivityTable.tsx
import React, { useEffect, useState } from "react";

import "./userActivity.scss";
import api from "../../config/axios";

interface User {
  id: string;
  name: string;
  imgUrl: string;
  gender: string;
  phone: string;
  email: string;
  dob: {
    year: number;
    month: number;
    day: number;
  };
  role: number; // Thêm thuộc tính role
}

const UserActivityTable: React.FC = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("Account/active");
        const data = response.data.map((user: any) => ({
          id: user.id,
          name: user.name,
          imgUrl: user.imgUrl,
          gender: user.gender,
          phone: user.phone,
          email: user.email,
          dob: user.dob,
          role: user.role, // Lấy thông tin role từ backend
        }));
        console.log(data);
        setUserData(data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <table className="user-activity-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Avatar</th>
          <th>Gender</th>
          <th>Phone</th>
          <th>Email</th>
          <th>DOB</th>
          <th>Role</th> {/* Thêm cột Role */}
        </tr>
      </thead>
      <tbody>
        {userData.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>
              <img
                src={user.imgUrl}
                alt={user.name}
                style={{ width: 50, height: 50, borderRadius: "50%" }}
              />
            </td>
            <td>{user.gender}</td>
            <td>{user.phone}</td>
            <td>{user.email}</td>
            <td>{`${user.dob.day}/${user.dob.month}/${user.dob.year}`}</td>
            <td>{user.role}</td> {/* Hiển thị tên role */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserActivityTable;

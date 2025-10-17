import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const UserEdit = ({ userId, token }) => {
    const { backendUrl } = useContext(ShopContext);
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  useEffect(() => {
    // Lấy thông tin người dùng hiện tại
    const fetchUser = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/user/single',userId, {headers:{token}});
        setUser(response.data);
      } catch (error) {
        console.error(error);
        toast.error('Không thể tải thông tin người dùng.');
      }
    };

    fetchUser();
  }, [userId, token]);

  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(backendUrl + `/api/user/update/${_id}`,user,{headers:{token}}
      );
      if (response.data.success) {
        toast.success('Cập nhật thông tin người dùng thành công!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra khi cập nhật thông tin.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSave}
        className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Chỉnh sửa thông tin người dùng</h2>

        <label className="block font-bold mb-2">Họ và tên</label>
        <input
          type="text"
          value={user.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full px-2 py-1 border rounded mb-4"
        />

        <label className="block font-bold mb-2">Email</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full px-2 py-1 border rounded mb-4"
        />

        <label className="block font-bold mb-2">Số điện thoại</label>
        <input
          type="tel"
          value={user.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className="w-full px-2 py-1 border rounded mb-4"
        />

        <label className="block font-bold mb-2">Mật khẩu</label>
        <input
          type="password"
          value={user.password}
          onChange={(e) => handleChange('password', e.target.value)}
          className="w-full px-2 py-1 border rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;

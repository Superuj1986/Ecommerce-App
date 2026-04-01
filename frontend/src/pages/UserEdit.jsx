import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const UserEdit = () => {
    const { backendurl, token } = useContext(ShopContext);
    const [userId, setUserId] = useState('');
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const response = await axios.post(backendurl + '/api/user/single', {}, { headers: { token } });
        if (response.data.success) {
          setUserId(response.data.user._id);
          setUser({
            name: response.data.user.name || '',
            email: response.data.user.email || '',
            phone: response.data.user.phone || '',
            password: '',
          });
        }
      } catch (error) {
        console.error(error);
        toast.error('Không thể tải thông tin người dùng.');
      }
    };
    fetchUser();
  }, [token]);

  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = { name: user.name, email: user.email, phone: user.phone };
      if (user.password) payload.password = user.password;
      const response = await axios.put(backendurl + `/api/user/update/${userId}`, payload, { headers: { token } });
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

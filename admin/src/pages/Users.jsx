import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import Modal from '../components/Modal'
import { toast } from 'react-toastify'

const User = ({ token }) => {
  const [list, setList] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/user/list')
      if (response.data.success) {
        setList(response.data.users);
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  const removeUser = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/user/delete', { id }, { headers: token })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  const openUserModal = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };
  useEffect(() => {
    fetchList()
  }, [])
  return (
    <>
      <p className='mb-2'>Danh sách người dùng</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100'>
          <b>Tên</b>
          <b>Email</b>
          <b>Số điện thoại</b>
          <b className='text-center'>Hành động</b>
        </div>
        {
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr] items-center gap-2 py-1 border text-sm' key={index}>
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.phone}</p>
              <div>
                <p
                  onClick={() => openUserModal(item)}
                  className="text-right md:text-center cursor-pointer text-lg"
                >
                  Xem
                </p>
                <p
                  onClick={() => removeUser(item._id)}
                  className="text-right md:text-center cursor-pointer text-lg"
                >
                  X
                </p>
              </div>
            </div>
          ))
        }
      </div>
      <Modal
        isOpen={openModal}
        user={selectedUser}
        onClose={() => setOpenModal(false)}
      />
    </>
  )
}

export default User

import React from 'react'

const Modal = ({ isOpen, user, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">Thông tin chi tiết</h2>
        <div className="mb-2">
          <b>Tên:</b> <span>{user?.name}</span>
        </div>
        <div className="mb-2">
          <b>Email:</b> <span>{user?.email}</span>
        </div>
        <div className="mb-2">
          <b>Số điện thoại:</b> <span>{user?.phone}</span>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal

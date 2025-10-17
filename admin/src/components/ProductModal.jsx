import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App'

const ProductModal = ({ isOpen, product, onClose }) => {
  const [editableProduct, setEditableProduct] = useState(null);

  useEffect(() => {
    if (product) {
      setEditableProduct({
        ...product,
        image: product.image?.length === 4 ? product.image : [...product.image, ...Array(4 - product.image.length).fill('')],
        sizes: product.sizes || [], 
      });
    }
  }, [product]);

  if (!isOpen || !editableProduct) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(backendUrl + `/api/product/update/${editableProduct._id}`,editableProduct)
      if (response.data.success) {
        toast.success(response.data.message);
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra khi lưu sản phẩm.');
    }
  };

  const handleAddSize = () => {
    setEditableProduct((prev) => ({
      ...prev,
      sizes: [...prev.sizes, ''],
    }));
  };

  const handleSizeChange = (index, value) => {
    const updatedSizes = [...editableProduct.sizes];
    updatedSizes[index] = value;
    setEditableProduct((prev) => ({
      ...prev,
      sizes: updatedSizes,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Chỉnh sửa sản phẩm</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Hiển thị ảnh */}
          <div className="flex flex-col gap-4">
            <label className="block font-bold mb-2">Hình ảnh</label>
            {editableProduct.image.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img || '/placeholder.png'}
                  alt={`Ảnh ${index + 1}`}
                  className="w-32 h-32 object-cover border rounded cursor-pointer"
                />
              </div>
            ))}
          </div>

          {/* Thông tin sản phẩm */}
          <div className="flex flex-col gap-2">
            <label className="block font-bold">Tên sản phẩm</label>
            <input
              type="text"
              value={editableProduct.name || ''}
              onChange={(e) => setEditableProduct((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full px-2 py-1 border rounded"
            />

            <label className="block font-bold">Mô tả</label>
            <textarea
              value={editableProduct.description || ''}
              onChange={(e) => setEditableProduct((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full px-2 py-1 border rounded"
              rows={3}
            />

            <label className="block font-bold">Giá</label>
            <input
              type="number"
              value={editableProduct.price || ''}
              onChange={(e) => setEditableProduct((prev) => ({ ...prev, price: e.target.value }))}
              className="w-full px-2 py-1 border rounded"
            />

            <label className="block font-bold">Danh mục</label>
            <select
              value={editableProduct.category || ''}
              onChange={(e) => setEditableProduct((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full px-2 py-1 border rounded"
            >
              <option value="">Chọn danh mục</option>
              <option value="Men">Nam</option>
              <option value="Women">Nữ</option>
              <option value="Kids">Trẻ em</option>
            </select>

            <label className="block font-bold">Phân loại</label>
            <select
              value={editableProduct.subCategory || ''}
              onChange={(e) => setEditableProduct((prev) => ({ ...prev, subCategory: e.target.value }))}
              className="w-full px-2 py-1 border rounded"
            >
              <option value="">Chọn phân loại</option>
              <option value="Topwear">Áo</option>
              <option value="Underwear">Quần</option>
              <option value="Winterwear">Đồ mùa đông</option>
            </select>

            <label className="block font-bold">Kích cỡ</label>
            {editableProduct.sizes.map((size, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={size}
                  onChange={(e) => handleSizeChange(index, e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSize}
              className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Thêm kích cỡ
            </button>

            <label className="block font-bold mt-2">
              <input
                type="checkbox"
                checked={editableProduct.bestseller || false}
                onChange={(e) =>
                  setEditableProduct((prev) => ({ ...prev, bestseller: e.target.checked }))
                }
              />
              Bán chạy
            </label>
          </div>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            type="submit"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductModal;

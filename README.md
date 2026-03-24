# Ecommerce App

Ứng dụng thương mại điện tử full-stack gồm 3 phần: **Frontend** (người dùng), **Admin** (quản trị), **Backend** (API).

## Công nghệ sử dụng

- **Frontend & Admin**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Lưu trữ ảnh**: Cloudinary
- **Thanh toán**: Stripe
- **Xác thực**: JWT

---

## Cài đặt

### Yêu cầu

- Node.js >= 18
- Tài khoản [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Tài khoản [Cloudinary](https://cloudinary.com)
- Tài khoản [Stripe](https://stripe.com)

---

### 1. Clone repo

```bash
git clone https://github.com/your-username/ecommerce-app.git
cd ecommerce-app
```

---

### 2. Cấu hình Backend

```bash
cd backend
npm install
cp .env.example .env
```

Mở file `backend/.env` và điền các giá trị:

| Biến | Mô tả |
|------|-------|
| `MONGO` | Connection string MongoDB Atlas |
| `CLOUDINARY_NAME` | Cloud name trên Cloudinary |
| `CLOUDINARY_API` | API Key trên Cloudinary |
| `CLOUDINARY_SECRET` | API Secret trên Cloudinary |
| `JWT_SECRET` | Chuỗi bí mật tùy ý để ký JWT |
| `ADMIN_EMAIL` | Email đăng nhập trang admin |
| `ADMIN_PASSWORD` | Mật khẩu đăng nhập trang admin |
| `STRIPE_SECRET_KEY` | Secret key từ Stripe dashboard |

Khởi động backend:

```bash
npm run server
```

Backend chạy tại `http://localhost:4000`

---

### 3. Cấu hình Frontend

```bash
cd frontend
npm install
cp .env.example .env
```

Nội dung `frontend/.env`:

```env
VITE_BACKEND_URL = "http://localhost:4000"
```

Khởi động frontend:

```bash
npm run dev
```

Frontend chạy tại `http://localhost:5173`

---

### 4. Cấu hình Admin

```bash
cd admin
npm install
cp .env.example .env
```

Nội dung `admin/.env`:

```env
VITE_BACKEND_URL = "http://localhost:4000"
```

Khởi động admin:

```bash
npm run dev
```

Admin panel chạy tại `http://localhost:5174`

---

## Tính năng

### Người dùng
- Đăng ký / Đăng nhập
- Xem và tìm kiếm sản phẩm
- Thêm vào giỏ hàng, đặt hàng
- Thanh toán qua Stripe hoặc COD
- Xem lịch sử đơn hàng
- Chỉnh sửa thông tin cá nhân

### Admin
- Quản lý sản phẩm (thêm, sửa, xóa)
- Quản lý đơn hàng và cập nhật trạng thái
- Quản lý người dùng

---

## Cấu trúc thư mục

```
ecommerce-app/
├── backend/        # Express API
├── frontend/       # React app (người dùng)
└── admin/          # React app (quản trị)
```

---

## Lưu ý bảo mật

- Không commit file `.env` lên git (đã có trong `.gitignore`)
- Đổi `JWT_SECRET` thành chuỗi ngẫu nhiên đủ dài
- Đổi `ADMIN_EMAIL` và `ADMIN_PASSWORD` trước khi deploy

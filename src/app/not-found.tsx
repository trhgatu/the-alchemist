// src/app/not-found.tsx
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Không tìm thấy trang</h1>
      <p className="text-muted-foreground mb-6">
        Trang bạn đang tìm không tồn tại hoặc đã bị di chuyển.
      </p>
    </div>
  );
}

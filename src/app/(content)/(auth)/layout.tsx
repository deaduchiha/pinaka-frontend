export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <h1 className="ml-2 text-2xl font-bold text-gray-900">پیناکا</h1>
          </div>
          <p className="text-gray-600">پلتفرم تجارت الکترونیک مدرن</p>
        </div>
        {children}
      </div>
    </div>
  );
}

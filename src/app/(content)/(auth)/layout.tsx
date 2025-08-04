export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md mt-32">{children}</div>
    </div>
  );
}

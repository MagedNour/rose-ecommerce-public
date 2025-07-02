import Sidebar from "@/components/layout/dashboard/sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Main content */}
      <main className="flex">
        <Sidebar />
        {children}
      </main>
    </>
  );
}

import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative bg-black">
      {/* Sidebar (Hidden on mobile for now) */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80]">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="md:pl-72 h-full min-h-screen bg-black">
        {/* Top Header Placeholder (For mobile menu later) */}
        <div className="h-0 md:h-auto"></div>
        
        <div className="p-8 pt-10 h-full">
            {children}
        </div>
      </main>
    </div>
  );
}
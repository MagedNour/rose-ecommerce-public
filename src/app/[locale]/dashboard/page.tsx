import { getAllStatistics } from "@/lib/apis/dashboard/all-statistics.api";

export default async function Overview() {
  const Statistics = await getAllStatistics();
  return (
    <main className="bg-gray-100 w-full h-screen ">
      <h1>Overview</h1>
    </main>
  );
}

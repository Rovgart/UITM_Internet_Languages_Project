import React from "react";
import DashboardNavbar from "./components/Navbar/DashboardNavbar";
import DashboardBookList from "./components/List/DashboardBookList";

function Dashboard() {
<<<<<<< Updated upstream
=======
  const { data: TrendingAuthors } = useQuery({
    queryKey: ["trendingAuthors"],
    queryFn: () => fetchTrendingAuthors(),
  });
  useEffect(() => {
    console.log(TrendingAuthors);
  }, [TrendingAuthors]);
  if (!TrendingAuthors) {
    return;
  }
>>>>>>> Stashed changes
  return (
    <>
      <DashboardNavbar />
      <DashboardBookList />
    </>
  );
}

export default Dashboard;

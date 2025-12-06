import React, { useEffect, useState } from "react";
import { fetchSales } from "./services/api";
import Layout from "./components/Layout";
import SearchBar from "./components/SearchBar";
import FiltersBar from "./components/FiltersBar";
import SortDropdown from "./components/SortDropdown";
import SalesTable from "./components/SalesTable";
import PaginationControls from "./components/PaginationControls";
import Loader from "./components/Loader";
import EmptyState from "./components/EmptyState";
import StatsCards from "./components/StatsCards";

const PAGE_SIZE = 10;

function App() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    region: "",
    gender: "",
    ageMin: "",
    ageMax: "",
    productCategory: "",
    tags: "",
    paymentMethod: "",
    dateFrom: "",
    dateTo: ""
  });

  const [sort, setSort] = useState({
    sortBy: "customerName", // Figma shows Sort by Customer Name
    sortOrder: "asc"
  });

  const [page, setPage] = useState(1);

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: PAGE_SIZE
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Derived stats for KPI cards (current page only)
  const totalUnits = data.reduce(
    (sum, row) => sum + (Number(row.quantity) || 0),
    0
  );
  const totalAmount = data.reduce(
    (sum, row) => sum + (Number(row.totalAmount) || 0),
    0
  );
  const totalDiscount = data.reduce(
    (sum, row) =>
      sum +
      (row.discountPercentage
        ? ((Number(row.discountPercentage) || 0) *
          (Number(row.totalAmount) || 0)) /
        100
        : 0),
    0
  );

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetchSales({
          search,
          ...filters,
          sortBy: sort.sortBy,
          sortOrder: sort.sortOrder,
          page,
          limit: PAGE_SIZE
        });

        setData(response.data || []);
        setPagination(response.pagination);
      } catch (err) {
        console.error(err);
        setError("Failed to load sales data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [search, filters, sort, page]);

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleFiltersChange = (updated) => {
    setFilters((prev) => ({ ...prev, ...updated }));
    setPage(1);
  };

  const handleSortChange = (value) => {
    setSort(value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <Layout>
      <header className="app-header">
        <h1>Sales Management System</h1>
      </header>

      {/* Top bar: filters + search + sort */}
      {/* <div className="top-bar">
        <FiltersBar filters={filters} onChange={handleFiltersChange} />
        <div className="top-bar-right">
          <SearchBar value={search} onChange={handleSearchChange} />
          <SortDropdown sort={sort} onChange={handleSortChange} />
        </div>
      </div> */}

      <div className="top-controls">
        <FiltersBar filters={filters} onChange={handleFiltersChange} />

        <div className="right-controls">
          <SearchBar value={search} onChange={handleSearchChange} />
          <SortDropdown sort={sort} onChange={handleSortChange} />
        </div>
      </div>


      {/* KPI / summary cards */}
      <StatsCards
        totalUnits={totalUnits}
        totalAmount={totalAmount}
        totalDiscount={totalDiscount}
        totalRecords={pagination.totalItems}
      />

      {/* Table + pagination */}
      <section className="app-content">
        {loading && <Loader />}

        {!loading && error && <div className="error">{error}</div>}

        {!loading && !error && data.length === 0 && (
          <EmptyState message="No results found. Try adjusting search or filters." />
        )}

        {!loading && !error && data.length > 0 && (
          <>
            <SalesTable records={data} />
            <PaginationControls
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </section>
    </Layout>
  );
}

export default App;

import React, { useState, useEffect, useRef } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import "../styles/pages/CitiesTable.css";
import { fetchCityData } from "../api/cities";
import { BarLoader } from "react-spinners";

const CitiesTable: React.FC = () => {
  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const limit = 100;
  const offset = useRef<number>(0);
  const tableRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data: any[] = await fetchCityData(
        limit,
        offset.current,
        searchQuery
      );
      if (data.length > 0) {
        
        const filteredData = data.filter(
          (city) => !cities.find((c) => c.geoname_id === city.geoname_id)
        );
        setCities((prevCities) => [...prevCities, ...filteredData]);
        offset.current += limit; 
      }
    } catch (error) {
      console.error("Error fetching cities data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    addScrollListener();
    return () => removeScrollListener();
  }, [searchQuery]); // Only call fetchData when searchQuery changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
    offset.current = 0; // Reset offset when search query changes
    setCities([]); // Clear cities when search query changes
  };

  const addScrollListener = () => {
    if (tableRef.current) {
      tableRef.current.addEventListener("scroll", handleScroll);
    }
  };

  const removeScrollListener = () => {
    if (tableRef.current) {
      tableRef.current.removeEventListener("scroll", handleScroll);
    }
  };

  const handleScroll = () => {
    const scrollTop = tableRef.current!.scrollTop;
    const scrollHeight = tableRef.current!.scrollHeight;
    const clientHeight = tableRef.current!.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      fetchData();
    }
  };

  const columns: TableColumn<any>[] = [
    {
      name: "Name",
      selector: (row: any) => (
        <a
          href={`/weather/${encodeURIComponent(row.geoname_id)}`}
          rel="noopener noreferrer"
        >
          {row.name}
        </a>
      ),
      sortable: true,
    },
    {
      name: "Country",
      selector: (row: any) => row.country_code,
      sortable: true,
    },
    {
      name: "Country Name EN",
      selector: (row: any) => row.cou_name_en,
      sortable: true,
    },
    {
      name: "Population",
      selector: (row: any) => row.population,
      sortable: true,
    },
    {
      name: "Latitude",
      selector: (row: any) => row.coordinates.lat,
      sortable: true,
    },
    {
      name: "Longitude",
      selector: (row: any) => row.coordinates.lon,
      sortable: true,
    },
    {
      name: "Time Zone",
      selector: (row: any) => row.timezone,
      sortable: true,
    },
  ];

  return (
    <div className="container">
      <h1 className="piti">
        Infinite scroll - Weather Forecast Web Application
      </h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search city..."
        className="search-input"
      />
      <div ref={tableRef} className="table-container">
        <DataTable
          columns={columns}
          data={cities}
          pagination={false}
          noHeader
          className="data-table"
        />
        {loading && (
          <div className="loader-container">
            <BarLoader color={"#123abc"} loading={loading} />
          </div>
        )}
        {!loading && cities.length === 0 && (
          <p className="no-cities">No matching cities found</p>
        )}
      </div>
    </div>
  );
};

export default CitiesTable;

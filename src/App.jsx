import { useEffect, useState } from "react";
import bg2 from "./assets/nen-moi.jpg.png";
import bgTrang1 from "./assets/banner-trang1.jpg";
import bgTrang2 from "./assets/banner-trang2.jpg";
import "./App.css";

const SHEET_ID = import.meta.env.VITE_SHEET_ID;
const SHEET_NAME = import.meta.env.VITE_SHEET_NAME;

function App() {
  const [shops, setShops] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    address: "",
    city: "",
    facebook: "",
  });

  useEffect(() => {
    fetch(
      `https://opensheet.elk.sh/${SHEET_ID}/${encodeURIComponent(SHEET_NAME)}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setShops(data);
        } else {
          console.error("Failed to load sheet data. Expected array but got:", data);
        }
      })
      .catch((err) => console.error("Error fetching shops:", err));
  }, []);

  const scrollToList = () => {
    document.getElementById("shop-list")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const uniqueCities = [
    ...new Set(shops.map((shop) => shop["Tỉnh Thành"]).filter(Boolean)),
  ];

  const filteredShops = shops.filter((shop) => {
    return (
      (shop["Tên Shop"] || "")
        .toLowerCase()
        .includes(filters.name.toLowerCase()) &&
      (shop["Địa Chỉ"] || "")
        .toLowerCase()
        .includes(filters.address.toLowerCase()) &&
      (filters.city === "" || shop["Tỉnh Thành"] === filters.city) &&
      (shop["Link Facebook"] || "")
        .toLowerCase()
        .includes(filters.facebook.toLowerCase())
    );
  });

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
      }}
    >
      {/* TRANG 1 */}
      <section
        style={{
          width: "100%",
          position: "relative",
          display: "flex",
        }}
      >
        <img 
          src={bgTrang1} 
          alt="Banner" 
          style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }} 
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
          }}
        >
          <button
            className="glow-button hero-btn"
            onClick={scrollToList}
          >
            XEM DANH SÁCH
          </button>
        </div>
      </section>

      {/* TRANG 2 */}
      <section
        style={{
          width: "100%",
          position: "relative",
          display: "flex",
        }}
      >
        <img 
          src={bgTrang2} 
          alt="Banner 2" 
          style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }} 
        />
      </section>

      {/* TRANG 3 */}
      <section
        id="shop-list"
        style={{
          height: "110vh",
          padding: "40px",
          backgroundImage: `url(${bg2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
        }}
      >
        <h2 className="section-2-title">
          DANH SÁCH ĐẠI SỨ CHIẾN DỊCH TRÊN TOÀN QUỐC
        </h2>

        <div className="table-wrapper">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "white",
              color: "#333",
            }}
          >
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "45%" }} />
              <col style={{ width: "30%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>
            <thead>
              <tr>
                <th className="table-th table-th-sticky">
                  Tỉnh Thành
                </th>
                <th className="table-th table-th-sticky">
                  Tên Shop
                </th>

                <th className="table-th table-th-sticky">
                  Địa Chỉ
                </th>
                <th className="table-th table-th-sticky">
                  Facebook
                </th>
              </tr>

              {/* FILTER ROW */}
              <tr>
                <th className="table-th table-th-filter">
                  <select
                    value={filters.city}
                    onChange={(e) =>
                      setFilters({ ...filters, city: e.target.value })
                    }
                    className="table-input"
                  >
                    <option value="">Tất cả</option>
                    {uniqueCities.map((city, i) => (
                      <option key={i} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </th>
                <th className="table-th table-th-filter">
                  <input
                    type="text"
                    placeholder="Lọc tên shop"
                    value={filters.name}
                    onChange={(e) =>
                      setFilters({ ...filters, name: e.target.value })
                    }
                    className="table-input"
                  />
                </th>
                <th className="table-th table-th-filter">
                  <input
                    type="text"
                    placeholder="Lọc địa chỉ"
                    value={filters.address}
                    onChange={(e) =>
                      setFilters({ ...filters, address: e.target.value })
                    }
                    className="table-input"
                  />
                </th>

                <th className="table-th table-th-filter">
                  <input
                    type="text"
                    placeholder="Lọc Facebook"
                    value={filters.facebook}
                    onChange={(e) =>
                      setFilters({ ...filters, facebook: e.target.value })
                    }
                    className="table-input"
                  />
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredShops.map((shop, i) => (
                <tr key={i}>
                  <td className="table-td">{shop["Tỉnh Thành"]}</td>

                  <td className="table-td table-td-center">
                    {shop["Tên Shop"]}
                  </td>

                  <td className="table-td">{shop["Địa Chỉ"]}</td>

                  <td className="table-td">
                    <a
                      href={shop["Link Facebook"]}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#0d6efd",
                        fontWeight: "500",
                      }}
                    >
                      Facebook
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;

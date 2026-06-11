import { useEffect, useState } from "react";
import bg2 from "./assets/nen-moi.jpg.png";

const SHEET_ID = "1-cLAxym0HtBYNT9RkwJW6vuDbLGfVjU2QhWhGIDcJqA";
const SHEET_NAME = "Data 1";

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
      `https://opensheet.elk.sh/${SHEET_ID}/${encodeURIComponent(SHEET_NAME)}`
    )
      .then((res) => res.json())
      .then((data) => setShops(data))
      .catch((err) => console.error(err));
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
      (shop["link Facebook"] || "")
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
          height: "100vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }} 
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            color: "white",
          }}
        >
          <h1 style={{ fontSize: "72px", marginBottom: "24px" }}>
            Hệ Thống Cửa Hàng
          </h1>

          <button
            onClick={scrollToList}
            style={{
              padding: "16px 32px",
              fontSize: "18px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Xem danh sách
          </button>
        </div>
      </section>

      {/* TRANG 2 */}
      <section
        id="shop-list"
        style={{
          height: "110vh",
          padding: "30px",
          backgroundImage: `url(${bg2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
        }}
      >
        <h2
          style={{
            textAlign: "left",
            fontSize: "50px",
            fontWeight: "900",
            
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginTop: "90px",
            marginBottom: "40px",

            textShadow: `
              0 0 2px #0d47a1,
              2px 2px 0 #0d47a1,
              -2px 2px 0 #0d47a1,
              2px -2px 0 #0d47a1,
              -2px -2px 0 #0d47a1,
              8px 8px 10px rgba(0,0,0,0.4)
            `,
          }}
        >
          DANH SÁCH ĐẠI SỨ CHIẾN DỊCH TRÊN TOÀN QUỐC
        </h2>

        <div
          style={{
            overflow: "auto",
            maxHeight: "70vh",
            background: "rgba(255,255,255,0.85)",
            borderRadius: "20px",
            border: "6px solid #66b3ff",
            boxShadow: "0 0 20px rgba(0,0,0,0.15)",

            transform: "translateY(60px)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "white",
              color: "#333",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    ...thStyle,
                    position: "sticky",
                    top: 0,
                    zIndex: 20,
                  }}
                >
                  Tên Shop
                </th>
                <th
                  style={{
                    ...thStyle,
                    position: "sticky",
                    top: 0,
                    zIndex: 20,
                  }}
                >
                  Địa Chỉ
                </th>
                
                <th
                  style={{
                    ...thStyle,
                    position: "sticky",
                    top: 0,
                    zIndex: 20,
                  }}
                >
                  Tỉnh Thành
                </th>
                <th
                  style={{
                    ...thStyle,
                    position: "sticky",
                    top: 0,
                    zIndex: 20,
                  }}
                >
                  Facebook
                </th>
              </tr>

              {/* FILTER ROW */}
              <tr>
                <th
                  style={{
                    ...thStyle,
                    position: "sticky",
                    top: 42,
                    zIndex: 19,
                    background: "rgb(13, 110, 253)",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Lọc tên shop"
                    value={filters.name}
                    onChange={(e) =>
                      setFilters({ ...filters, name: e.target.value })
                    }
                    style={inputStyle}
                  />
                </th>
                <th
                  style={{
                    ...thStyle,
                    position: "sticky",
                    top: 42,
                    zIndex: 19,
                    background: "rgb(13, 110, 253)",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Lọc địa chỉ"
                    value={filters.address}
                    onChange={(e) =>
                      setFilters({ ...filters, address: e.target.value })
                    }
                    style={inputStyle}
                  />
                </th>

                
        
                <th
                  style={{
                    ...thStyle,
                    position: "sticky",
                    top: 42,
                    zIndex: 19,
                    background: "rgb(13, 110, 253)",
                  }}
                >
                  <select
                    value={filters.city}
                    onChange={(e) =>
                      setFilters({ ...filters, city: e.target.value })
                    }
                    style={inputStyle}
                  >
                    <option value="">Tất cả</option>
                    {uniqueCities.map((city, i) => (
                      <option key={i} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </th>

                <th
                  style={{
                    ...thStyle,
                    position: "sticky",
                    top: 42,
                    zIndex: 19,
                    background: "rgb(13, 110, 253)",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Lọc Facebook"
                    value={filters.facebook}
                    onChange={(e) =>
                      setFilters({ ...filters, facebook: e.target.value })
                    }
                    style={inputStyle}
                  />
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredShops.map((shop, i) => (
                <tr key={i}>
                  <td style={tdStyle}>{shop["Tên Shop"]}</td>
                  <td style={tdStyle}>{shop["Địa Chỉ"]}</td>
                  <td style={tdStyle}>{shop["Tỉnh Thành"]}</td>
                  <td style={tdStyle}>
                    <a
                      href={shop["link Facebook"]}
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

const thStyle = {
  padding: "14px",
  border: "1px solid #fdfdfd",
  background: "#0d6efd",
  color: "white",
  fontWeight: "700",
  fontSize: "20px",
};

const tdStyle = {
  padding: "16px",
  border: "1px solid #d9e8f7",
  background: "rgba(255,255,255,0.92)",
  color: "#222",
  fontSize: "20px",
  fontWeight: "600",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #c8dff5",
  background: "#ffffff",
  color: "#333",
};

export default App;
import { useEffect, useState } from "react";

const SHEET_ID = "1-cLAxym0HtBYNT9RkwJW6vuDbLGfVjU2QhWhGIDcJqA";
const SHEET_NAME = "Data 1";

function App() {
  const [shops, setShops] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    address: "",
    phone: "",
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
      (shop["SĐT"] || "")
        .toLowerCase()
        .includes(filters.phone.toLowerCase()) &&
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
          minHeight: "100vh",
          padding: "60px",
          background: "#111",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "48px",
            color: "white",
            marginBottom: "40px",
          }}
        >
          Danh sách cửa hàng
        </h2>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "rgba(255,255,255,0.08)",
              color: "white",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Tên Shop</th>
                <th style={thStyle}>Địa Chỉ</th>
                <th style={thStyle}>SĐT</th>
                <th style={thStyle}>Tỉnh Thành</th>
                <th style={thStyle}>Facebook</th>
              </tr>

              {/* FILTER ROW */}
              <tr>
                <th style={thStyle}>
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

                <th style={thStyle}>
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

                <th style={thStyle}>
                  <input
                    type="text"
                    placeholder="Lọc SĐT"
                    value={filters.phone}
                    onChange={(e) =>
                      setFilters({ ...filters, phone: e.target.value })
                    }
                    style={inputStyle}
                  />
                </th>

                <th style={thStyle}>
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

                <th style={thStyle}>
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
                  <td style={tdStyle}>{shop["SĐT"]}</td>
                  <td style={tdStyle}>{shop["Tỉnh Thành"]}</td>
                  <td style={tdStyle}>
                    <a
                      href={shop["link Facebook"]}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#4da6ff" }}
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
  padding: "12px",
  border: "1px solid rgba(255,255,255,0.2)",
};

const tdStyle = {
  padding: "12px",
  border: "1px solid rgba(255,255,255,0.15)",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "6px",
  border: "none",
};

export default App;
import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Component from "./Component";
import Catalog from "./Catalog";
import Register from "./Register";
import Login from "./Login";
import Header from "./Header";
import AdminUserList from "./AdminUserList";
import Settings from "./Settings";

const yourComponentsData = [
  {
    id: 1,
    name: "Д214",
    class: "Полупроводниковые приборы",
    group: "Диоды полупроводниковые",
    subgroup: "Диоды выпрямительные",
    tuNumber: "УЖ3.362.018ТУ",
    reliability: {
      lambdaBSG: "0.091e-6 1/ч",
      lambdaBSH: "0.0086e-8 1/ч",
      Ea: "0.85 эВ",
      Trz: "0.73",
      Tsx: "0.088"
    }
  },
  {
    id: 2,
    name: "Д214А",
    class: "Полупроводниковые приборы",
    group: "Диоды полупроводниковые",
    subgroup: "Диоды выпрямительные",
    tuNumber: "УЖ3.362.018ТУ",
    reliability: {
      lambdaBSG: "0.091e-6 1/ч",
      lambdaBSH: "0.0086e-8 1/ч",
      Ea: "0.85 эВ",
      Trz: "0.73",
      Tsx: "0.088"
    }
  },
  {
    id: 3,
    name: "Д214Б",
    class: "Полупроводниковые приборы",
    group: "Диоды полупроводниковые",
    subgroup: "Диоды выпрямительные",
    tuNumber: "УЖ3.362.018ТУ",
    reliability: {
      lambdaBSG: "0.091e-6 1/ч",
      lambdaBSH: "0.0086e-8 1/ч",
      Ea: "0.85 эВ",
      Trz: "0.73",
      Tsx: "0.088"
    }
  },
  {
    id: 4,
    name: "Д215",
    class: "Полупроводниковые приборы",
    group: "Диоды полупроводниковые",
    subgroup: "Диоды выпрямительные",
    tuNumber: "УЖ3.362.018ТУ",
    reliability: {
      lambdaBSG: "0.091e-6 1/ч",
      lambdaBSH: "0.0086e-8 1/ч",
      Ea: "0.85 эВ",
      Trz: "0.73",
      Tsx: "0.088"
    }
  },
  {
    id: 5,
    name: "Д215А",
    class: "Полупроводниковые приборы",
    group: "Диоды полупроводниковые",
    subgroup: "Диоды выпрямительные",
    tuNumber: "УЖ3.362.018ТУ",
    reliability: {
      lambdaBSG: "0.091e-6 1/ч",
      lambdaBSH: "0.0086e-8 1/ч",
      Ea: "0.85 эВ",
      Trz: "0.73",
      Tsx: "0.088"
    }
  },
  {
    id: 6,
    name: "Д215А",
    class: "Полупроводниковые приборы",
    group: "Диоды полупроводниковые",
    subgroup: "Диоды выпрямительные",
    tuNumber: "УЖ3.362.018ТУ",
    reliability: {
      lambdaBSG: "0.091e-6 1/ч",
      lambdaBSH: "0.0086e-8 1/ч",
      Ea: "0.85 эВ",
      Trz: "0.73",
      Tsx: "0.088"
    }
  },
  {
    id: 7,
    name: "Д215Б",
    class: "Полупроводниковые приборы",
    group: "Диоды полупроводниковые",
    subgroup: "Диоды выпрямительные",
    tuNumber: "УЖ3.362.018ТУ",
    reliability: {
      lambdaBSG: "0.091e-6 1/ч",
      lambdaBSH: "0.0086e-8 1/ч",
      Ea: "0.85 эВ",
      Trz: "0.73",
      Tsx: "0.088"
    }
  },
  
];

function App() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const navigate = useNavigate();
  const API_BASE_URL = 'http://213.171.29.113:5000';
  /*const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;*/

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    
    if (token) {
      try {
        const response = await fetch( `${API_BASE_URL}/user/me`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Ошибка проверки авторизации:", err);
        localStorage.removeItem("token");
      }
    }
    setIsAuthChecked(true);
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    checkAuth();
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setProfileData(null);
    navigate("/login");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div className="page">
      {isLoggedIn && <Header onLogout={handleLogout} />}
      <Routes>
        {!isLoggedIn ? (
          <>
            {isAuthChecked && (
              <>
                <Route
                  path="/login"
                  element={<Login onLoginSuccess={handleLoginSuccess} />}
                />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}
          </>
        ) : (
          <>
        {/* Главная страница - только поиск */}
        <Route path="/" element={<Catalog />} />
        <Route path="/settings" element={
                <div>
                  <Settings profileData={profileData} />
                </div>
              }/>
        {/* Страница компонента */}
        <Route 
          path="/component/:id" 
          element={<Component components={yourComponentsData}/>} 
        />
        <Route path="/admin-list" element={<AdminUserList />} />
        </>
        )}
      </Routes>
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import SearchBar from "./SearchBar";
import Component from "./Component";
import Catalog from "./Catalog";

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
  return (
    <div className="page">
      {/* Поиск доступен на всех страницах */}
      <SearchBar components={yourComponentsData} />
      
      <Routes>
        {/* Главная страница - только поиск */}
        <Route path="/" element={<Catalog />} />
        
        {/* Страница компонента */}
        <Route 
          path="/component/:id" 
          element={<Component components={yourComponentsData}/>} 
        />
      </Routes>
    </div>
  );
}

export default App;

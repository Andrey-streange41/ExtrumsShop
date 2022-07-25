import { Routes, Route } from "react-router-dom";
import "./assets/scss/style.scss";
import "./assets/scss/reset.css";
import { Home } from "./pages/Home/Home";
import { Favorite } from "./pages/Favorite/Favorite";
import { Catalog } from "./pages/Catalog/index.tsx";
import { Detail } from "./pages/Detail/index.tsx";
import { Category } from "./pages/Category/index.tsx";
import {Subcategory} from './pages/Subcategory/index.tsx';
import { AccountInfo } from "./pages/AccountInfo/index.tsx";


function App() {
  return (
    <div className="App">
      <Routes>
        
        <Route exact path="/catalog/:category/:id" element={<Detail />} />
        <Route exact path="/:page/:category/subcategory/:subcategory" element={<Catalog/>}/>
        <Route exact path="/favorites/:category/:id" element={<Detail />} />
        <Route exact path="/catalog/:category" element={<Catalog />} />
        <Route exact path="/catalog" element={<Catalog />} />
        <Route exact path="/favorites/:category" element={<Favorite />} />
        <Route exact path="/favorites" element={<Favorite />} />
        <Route exact path="/account" element={<AccountInfo/>}/>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

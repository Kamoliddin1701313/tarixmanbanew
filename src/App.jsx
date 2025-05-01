import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layouts from "./Layouts/Layouts";
import Home from "./Home/Home";
import About from "./Pages/About/About";
import Library from "./Pages/Library/Library";
import News from "./Pages/News/News";
import NotFound from "./Components/NotFound/NotFound";
import ScrollToTop from "./Components/ScrollToTop";
import axios from "axios";
import NewsDetail from "./Details/NewsDetail/NewsDetail";
import LibraryDetail from "./Details/LibraryDetail/LibraryDetail";
import HomeImageDetail from "./Details/HomeImageDetail/HomeImageDetail";
import ArchaeologicalItemDetail from "./Details/ArchaeologicalItemDetail/ArchaeologicalItemDetail";
// import ImageDetailView from "./Details/ImageDetailView/ImageDetailView";
import ImageViewDetail from "./Details/ImageViewDetail/ImageViewDetail";
import { createContext, useState } from "react";
import Search from "./Components/Search/Search";
import Modal from "./Details/HomeImageDetail/Modal/Modal";

axios.defaults.baseURL = "https://backend.tarixmanba.uz/api/";

export const ValueContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [openIcon, setOpenIcon] = useState(false);

  return (
    <ValueContext.Provider
      value={{ searchValue, setSearchValue, openIcon, setOpenIcon }}
    >
      <div>
        <ScrollToTop />
        <Routes>
          <Route element={<Layouts />}>
            <Route path="/" index element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/news" element={<News />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
            {/* DETAILS */}
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/library/:id" element={<LibraryDetail />} />
            <Route path="/homeImageDetail/:id" element={<HomeImageDetail />} />
            <Route path="/modal/:id" element={<Modal />} />
            <Route
              path="/homeImageDetail/:id/:detailId"
              element={<ImageViewDetail />}
            />
            <Route
              path="/archaeological/:id"
              element={<ArchaeologicalItemDetail />}
            />
          </Route>
        </Routes>
      </div>
    </ValueContext.Provider>
  );
}

export default App;

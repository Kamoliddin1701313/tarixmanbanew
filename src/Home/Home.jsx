import React, { useContext } from "react";
import "./home.scss";
import HomeImage from "./HomeImage/HomeImage";
import ArchaeologicalItem from "../Components/ArchaeologicalItem/ArchaeologicalItem";
import { ValueContext } from "../App";
import Search from "../Components/Search/Search";

function Home() {
  const { searchValue } = useContext(ValueContext);

  return (
    <div>
      {searchValue.trim().length > 0 ? (
        <Search />
      ) : (
        <div>
          <HomeImage />
          <ArchaeologicalItem />
        </div>
      )}

      {/* <HomeImage />
      <ArchaeologicalItem /> */}
    </div>
  );
}

export default Home;

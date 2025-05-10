import { useContext, useEffect } from "react";
import "./home.scss";
import HomeImage from "./HomeImage/HomeImage";
import ArchaeologicalItem from "../Components/ArchaeologicalItem/ArchaeologicalItem";
import { ValueContext } from "../App";
import Search from "../Components/Search/Search";
import Loading from "../Loading/Loading";

function Home() {
  const { searchValue, setSearchValue } = useContext(ValueContext);

  useEffect(() => {
    setSearchValue("");
  }, []);

  return (
    <div>
      {searchValue.trim().length === 0 ? (
        <>
          <HomeImage />
          <ArchaeologicalItem />
        </>
      ) : searchValue.trim().length > 0 ? (
        <Search />
      ) : (
        <Loading />
      )}

      {/* <HomeImage />
      <ArchaeologicalItem /> */}

      {/* {searchValue.trim().length > 0 ? (
        <Search />
      ) : (
        <div>
          <HomeImage />
          <ArchaeologicalItem />
        </div>
      )} */}
    </div>
  );
}

export default Home;

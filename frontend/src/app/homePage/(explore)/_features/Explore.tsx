import SearchIcon from "../_assets/SearchIcon";
import CreaterCard from "../_components/CreaterCard";

const Explore = () => {
  return (
    <div className="w-full px-10 h-screen flex flex-col gap-6 cursor-default">
      <div className="flex flex-col gap-6">
        <h1 className="text-[20px] font-semibold">Explore creaters</h1>
        <div className="flex border items-center px-2.5 rounded-lg py-1 gap-2 w-[250px]">
          <SearchIcon />
          <input placeholder="Search name " />
        </div>
      </div>
      <CreaterCard />
    </div>
  );
};

export default Explore;

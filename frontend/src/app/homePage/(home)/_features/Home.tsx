import RecentTransactions from "../_components/RecentTransactions";
import UserInformation from "../_components/UserInformation";

const Home = () => {
  return (
    <div className="w-full px-10 h-full flex flex-col gap-6">
      <UserInformation />
      <RecentTransactions />
    </div>
  );
};

export default Home;

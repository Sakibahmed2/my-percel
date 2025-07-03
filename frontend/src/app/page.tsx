import Coins from "@/components/Coins";
import MyParcelForm from "@/components/MyParcelForm";

const HomePage = () => {
  return (
    <div className="md:flex justify-center items-center h-screen gap-4 space-y-5 md:space-x-0">
      <div>
        <MyParcelForm />
      </div>

      <div>
        <Coins />
      </div>
    </div>
  );
};

export default HomePage;

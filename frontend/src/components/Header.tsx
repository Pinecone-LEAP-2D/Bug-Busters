import { Coffee } from "lucide-react";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <div className="flex justify-between">
      <div className="font-bold text-base leading-5 align-middle flex">
        <Coffee />
        Buy Me Coffee
      </div>
      <div>
        <Button className="bg-gray-200 text-black">Log out</Button>
      </div>
    </div>
  );
};

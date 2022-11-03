import Logo from "../assets/DuckLogo.png";
import { Bars3Icon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <>
      <div className="w-full h-20 bg-black flex items-center justify-between px-4">
        <div className="">
          <Bars3Icon className="w-8 h-8 text-ivory" />
        </div>
        <div className="flex gap-3">
          <img src={Logo} alt="err" className="w-9 h-9" />
          <div className="font-hbios text-3xl text-ivory">덕메이트</div>
          <img src={Logo} alt="err" className="w-9 h-9" />
        </div>
        <div className="">
          <Bars3Icon className="w-8 h-8 text-black" />
        </div>
      </div>
    </>
  );
};

export default Header;

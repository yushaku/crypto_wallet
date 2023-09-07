import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  TfiArrowTopRight,
  TfiPlus,
  TfiExchangeVertical,
  TfiStatsUp,
} from "react-icons/tfi";

export const topBar = [
  {
    Icon: TfiArrowTopRight,
    link: "/send",
    name: "Send",
  },
  {
    Icon: TfiPlus,
    name: "Buy",
    link: "/buy",
  },
  {
    Icon: TfiExchangeVertical,
    name: "Exchange",
    link: "/exchange",
  },
  {
    Icon: TfiStatsUp,
    name: "Portfolio",
    link: "/portfolio",
  },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (to: string) => {
    if (location.pathname.includes(to)) {
    } else {
      navigate(to);
    }
  };

  return (
    <nav className="rounded-3xl bg-gray-100/50 shadow-md ml-6 my-[2dvh] h-[80dvh] flex flex-col">
      <div className="py-4 my-8">
        <Link to="/" className="flexCenter">
          <img
            alt="zinza wallet logo"
            src="/logo.png"
            width={60}
            height={60}
            loading="lazy"
          />
        </Link>

        <ul className="flex flex-col gap-2 mt-12">
          {topBar.map(({ link, Icon, name }, index) => {
            const isSelected = location.pathname.includes(link);

            const selectLink = isSelected ? "gradient_bg" : "stroke-white";

            return (
              <li
                key={index}
                onClick={() => handleClick(link)}
                className="p-3 w-[250px] "
              >
                <button
                  className={`${selectLink} relative flex items-center p-4 rounded-full`}
                >
                  <Icon className={`stroke-blue-500 stroke-[1px] w-6 h-6`} />
                  <span className="ml-3">{name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

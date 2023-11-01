import {
  PieChartIcon,
  SparklesIcon,
  TicketIcon,
  Users2Icon,
} from 'lucide-react';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type BottomNavMenu = {
  icon: ReactNode;
  name: string;
  path: string;
};

const bottomNavItems: Array<BottomNavMenu> = [
  {
    icon: <PieChartIcon className="h-5 w-5  mr-3" />,
    name: 'Overview',
    path: '/',
  },
  {
    icon: <TicketIcon className="h-5 w-5  mr-3" />,
    name: 'Tickets',
    path: '/ticket',
  },
  {
    icon: <SparklesIcon className="h-5 w-5  mr-3" />,
    name: 'Ideas',
    path: '/ideas',
  },
  {
    icon: <Users2Icon className="h-5 w-5  mr-3" />,
    name: 'Contacts',
    path: '/contact',
  },
];

const BottomNav = () => {
  return (
    <div className="block fixed w-full h-12 bottom-0 bg-foreground md:hidden dark:bg-black/40">
      <div className="h-full flex flex-row justify-between items-center px-14">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => (isActive ? '' : 'text-muted/70')}
          >
            <div className="flex flex-col justify-center items-center">
              {item.icon}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;

import { sidebarItemStyle } from '@/styles';
import {
  BookTextIcon,
  JoystickIcon,
  MedalIcon,
  PieChartIcon,
  SettingsIcon,
  SparklesIcon,
  TicketIcon,
  Users2Icon,
} from 'lucide-react';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type SidebarMenu = {
  icon: ReactNode;
  name: string;
  path: string;
};

const sidebarItems: Array<SidebarMenu> = [
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
  {
    icon: <JoystickIcon className="h-5 w-5  mr-3" />,
    name: 'Agents',
    path: '/agent',
  },
  {
    icon: <BookTextIcon className="h-5 w-5  mr-3" />,
    name: 'Articles',
    path: '/article',
  },
];

const sidebarSecondItems: Array<SidebarMenu> = [
  {
    icon: <SettingsIcon className="h-5 w-5  mr-3" />,
    name: 'Settings',
    path: 'settings',
  },

  {
    icon: <MedalIcon className="h-5 w-5  mr-3" />,
    name: 'Subscription',
    path: 'subscription',
  },
];

const Sidebar = () => {
  return (
    <aside className="bg-foreground dark:bg-zinc-900 hidden w-64 border-r dark:border-muted/30 py-6 scrollbar-hide overflow-auto hover:overflow-scroll h-screen md:block space-y-8">
      <div className="flex justify-center">
        <h1 className="font-bold text-white text-lg">Dashboard Kit</h1>
      </div>
      <div className="py-3">
        <div className="space-y-4 ">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? sidebarItemStyle.itemActive
                  : sidebarItemStyle.itemDefault
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
          <hr className="bg-muted/50 opacity-20" />
          {sidebarSecondItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? sidebarItemStyle.itemActive
                  : sidebarItemStyle.itemDefault
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

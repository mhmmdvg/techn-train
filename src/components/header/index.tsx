import { Outlet, useLocation } from 'react-router-dom';
import catPhoto from '../../assets/IMG_6554.jpg';
import { BellIcon, MoonIcon, SearchIcon, SunIcon } from 'lucide-react';
import ButtonIcon from '../button-icon';
import { FC } from 'react';
import { UserType } from '@/types/user-type';

type IProps = {
  mode: string | null;
  toggle: () => void;
};

const Header: FC<IProps> = ({ mode, toggle }) => {
  const { pathname } = useLocation();
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  const headerTitle = (path: string) => {
    switch (path) {
      case '':
        return 'Overview';
      case 'ticket':
        return 'Ticket';

      default:
        return 'No page';
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between px-10 py-4">
        <h1 className="hidden md:block text-lg text-secondary dark:text-white font-bold">
          {headerTitle(pathname.split('/')[1])}
        </h1>
        <div className="flex flex-row items-center space-x-3 divide-x-2">
          <div className="flex flex-row items-center space-x-1 px-2">
            <ButtonIcon>
              <SearchIcon className="h-4 w-4 " />
            </ButtonIcon>
            <ButtonIcon>
              <BellIcon className="h-4 w-4 " />
            </ButtonIcon>
            <ButtonIcon onClick={toggle}>
              {mode === 'dark' ? (
                <MoonIcon className="h-4 w-4" />
              ) : (
                <SunIcon className="h-4 w-4" />
              )}
            </ButtonIcon>
          </div>

          <div className="flex flex-row items-center px-5 space-x-3">
            <p className="font-semibold text-secondary dark:text-white text-sm">
              {user.name}
            </p>
            <img
              src={catPhoto}
              className="w-10 rounded-full border-2 border-muted"
            />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DashboardSidebar = ({ sidebarCollapsed }: { sidebarCollapsed: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const { t } = useTranslation();
  const sidebarItems = [
    {
      title: t('sidebar.dashboard'),
      icon: 'i-solar-window-frame-bold-duotone',
      path: '/',
    },
    {
      title: 'Patients',
      icon: 'i-solar-users-group-rounded-bold-duotone',
      path: '/patients',
    },
    {
      title: 'Doctors',
      icon: 'i-solar-users-group-rounded-bold-duotone',
      path: '/doctors',
    },
    {
      title: "Appointments",
      icon: 'i-solar-calendar-bold-duotone',
      path: '/appointments',
    },
  ];
  return (
    <aside
      className={`${
        sidebarCollapsed ? 'md:w-16' : 'md:w-64'
      } bg-slate-600 dark:bg-slate-700 transition-width duration-700 w-full top-0 md:fixed bottom-0 z-30 flex-shrink-0   overflow-y-auto  lg:block`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 text-5xl bg-slate-100 dark:bg-slate-900 ">
          <Link to="/" className="i-solar-airbuds-case-charge-bold-duotone text-secondary-600"></Link>
        </div>
        <div className="mt-5">
          <nav className="flex-1 mt-5 text-xs font-medium leading-5 md:text-sm ">
            <ul className="m-0 ml-0 list-none">
              {sidebarItems.map((item, index) => (
                <li key={item.title} className={` ${currentIndex === index ? 'bg-slate-600 dark:bg-slate-800' : ''}`}>
                  <Link
                    onClick={() => setCurrentIndex(index === currentIndex ? -1 : index)}
                    className={`${sidebarCollapsed ? 'justify-center' : ''} ${
                      currentIndex === index ? 'bg-slate-600' : ''
                    }  ${
                      currentIndex === index ? 'bg-slate-700' : ''
                    } sidebar-item block py-4  px-4 flex items-center rtl:space-x-reverse space-x-2 text-white  decoration-none  leading-5  group group-hover:text-secondary-400 hover:bg-slate-700   dark:hover:bg-slate-800  focus:outline-none  transition duration-150 ease-in-out`}
                    to={item.path}
                  >
                    <span className={`${item.icon} text-primary-200 text-lg block `}></span>
                    {!sidebarCollapsed && <span className="block">{item.title}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;

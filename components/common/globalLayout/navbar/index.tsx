import React from 'react';
import styles from '@components/common/globalLayout/navbar/Navbar.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useIsMobile from '@hooks/useIsMobile';
import AutoHeightImage from '@components/common/autoHeightImage';

const Navbar = () => {
  const currentPath = usePathname();
  const { isMobile } = useIsMobile();

  return (
    <nav className={styles.root}>
      {TABS.map((tab) => (
        <Link
          href={tab.route}
          className={currentPath === tab.route ? styles.selected : undefined}
          key={tab.title}
        >
          {isMobile ? (
            <AutoHeightImage
              src={
                currentPath === tab.route
                  ? tab.mobileCheckedIcon
                  : tab.mobileIcon
              }
              alt={`${tab.title} 아이콘`}
              width={24}
              height={24}
            />
          ) : (
            <AutoHeightImage
              src={tab.icon}
              alt={`${tab.title} 아이콘`}
              width={24}
              height={24}
            />
          )}
          {tab.title}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;

export const TABS = [
  {
    route: '/dashboard',
    title: '대시보드',
    icon: '/images/navbar/dash-board.png',
    mobileIcon: '/images/navbar/dash-board-mobile.png',
    mobileCheckedIcon: '/images/navbar/dash-board-mobile-checked.png',
  },
  {
    route: '/goal-management',
    title: '목표관리',
    icon: '/images/navbar/goal-management.png',
    mobileIcon: '/images/navbar/goal-management-mobile.png',
    mobileCheckedIcon: '/images/navbar/goal-management-mobile-checked.png',
  },
  {
    route: '/memoir',
    title: '회고록',
    icon: '/images/navbar/memoir.png',
    mobileIcon: '/images/navbar/memoir-mobile.png',
    mobileCheckedIcon: '/images/navbar/memoir-mobile-checked.png',
  },
];

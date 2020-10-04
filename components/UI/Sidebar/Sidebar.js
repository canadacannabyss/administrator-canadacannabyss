import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FaHome,
  FaBox,
  FaBoxes,
  FaTags,
  FaPercent,
  FaSortAmountDownAlt,
  FaListUl,
  FaPlus,
  FaBars,
  FaObjectUngroup,
  FaUser,
  FaCreditCard
} from 'react-icons/fa';
import {
  SidebarContainer,
  SidebarLink,
  ToggleSidebarButton,
  Background
} from '../../../styles/Components/UI/Sidebar/Sidebar';

const Sidebar = () => {
  const router = useRouter();
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const onClickToggleSidebar = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return (
    <>
      {router.asPath !== '/login' &&
        router.asPath !== '/' &&
        !router.asPath.includes('/reset-password/') &&
        !router.asPath.includes('/confirmation/') &&
        !router.asPath.includes('/register/') && (
          <>
            <Background
              toggleSidebar={toggleSidebar}
              onClick={() => {
                onClickToggleSidebar();
              }}
            />
            <ToggleSidebarButton
              toggleSidebar={toggleSidebar}
              onClick={() => {
                onClickToggleSidebar();
              }}
            >
              {toggleSidebar ? <FaPlus /> : <FaBars />}
            </ToggleSidebarButton>
            <SidebarContainer toggleSidebar={toggleSidebar}>
              <Link href='/dashboard' as='/dashboard'>
                <SidebarLink
                  toggleSidebar={toggleSidebar}
                  onClick={() => {
                    onClickToggleSidebar();
                  }}
                >
                  <FaHome />
                  <p>Dashboard</p>
                </SidebarLink>
              </Link>
              <Link href='/products' as='/products'>
                <SidebarLink
                  toggleSidebar={toggleSidebar}
                  onClick={() => {
                    onClickToggleSidebar();
                  }}
                >
                  <FaBox />
                  <p>Products</p>
                </SidebarLink>
              </Link>
              <Link href='/bundles' as='/bundles'>
                <SidebarLink
                  toggleSidebar={toggleSidebar}
                  onClick={() => {
                    onClickToggleSidebar();
                  }}
                >
                  <FaBoxes />
                  <p>Bundles</p>
                </SidebarLink>
              </Link>
              <Link href='/promotions' as='/promotions'>
                <SidebarLink
                  toggleSidebar={toggleSidebar}
                  onClick={() => {
                    onClickToggleSidebar();
                  }}
                >
                  <FaTags />
                  <p>Promotions</p>
                </SidebarLink>
              </Link>
              <Link href='/banners' as='/banners'>
                <SidebarLink
                  toggleSidebar={toggleSidebar}
                  onClick={() => {
                    onClickToggleSidebar();
                  }}
                >
                  <FaObjectUngroup />
                  <p>Banners</p>
                </SidebarLink>
              </Link>
              <Link href='/coupons' as='/coupons'>
                <SidebarLink
                  toggleSidebar={toggleSidebar}
                  onClick={() => {
                    onClickToggleSidebar();
                  }}
                >
                  <FaPercent />
                  <p>Coupons</p>
                </SidebarLink>
              </Link>
              <Link href='/categories' as='/categories'>
                <SidebarLink
                  toggleSidebar={toggleSidebar}
                  onClick={() => {
                    onClickToggleSidebar();
                  }}
                >
                  <FaListUl />
                  <p>Categories</p>
                </SidebarLink>
              </Link>
              <Link href='/orders' as='/orders'>
                <SidebarLink
                  toggleSidebar={toggleSidebar}
                  onClick={() => {
                    onClickToggleSidebar();
                  }}
                >
                  <FaSortAmountDownAlt />
                  <p>Orders</p>
                </SidebarLink>
              </Link>
              <Link href='/resellers' as='/resellers'>
                <SidebarLink
                  toggleSidebar={toggleSidebar}
                  onClick={() => {
                    onClickToggleSidebar();
                  }}
                >
                  <FaUser />
                  <p>Resellers</p>
                </SidebarLink>
              </Link>
              <Link href='/payment-method' as='/payment-method'>
                <SidebarLink
                  toggleSidebar={toggleSidebar}
                  onClick={() => {
                    onClickToggleSidebar();
                  }}
                >
                  <FaCreditCard />
                  <p>Payment Method</p>
                </SidebarLink>
              </Link>
            </SidebarContainer>
          </>
      )}
    </>
  );
};

export default Sidebar;

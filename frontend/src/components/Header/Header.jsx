import React from 'react';
import { Container, Logo, LogoutBtn, ProfileAvatar } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
  ];

  return (
    <header className='py-3 shadow bg-[#13293D]'>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='100px' />
            </Link>
          </div>
          <ul className='flex ml-auto space-x-4'>
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <Link
                      to={item.slug}
                      className='inline-block px-6 py-2 duration-200 hover:bg-[#2A628F] rounded-full text-white'
                    >
                      {item.name}
                    </Link>
                  </li>
                )
            )}
            {authStatus && <li><LogoutBtn /></li>}
          </ul>
          {authStatus && <ProfileAvatar />}
        </nav>
      </Container>
    </header>
  );
}

export default Header;

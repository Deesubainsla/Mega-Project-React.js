import React from 'react'
import { Logoutbtn, Container, Logo} from '../index'
import { useSelector } from 'react-redux'
import { useNavigate, Link} from 'react-router-dom'

function Header() {
  const authstatus = useSelector((state)=> state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true

    },
    {
      name: "Login",
      slug: "/login",
      active: !authstatus

    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authstatus

    },
    {
      name: "All Post",
      slug: "/all-post",
      active: authstatus

    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authstatus

    },
  ]
  return (
    <header className='py-3 shadow bg-gray-700'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to="/">
            <Logo/>
            </Link>
          </div>

          <ul className='flex ml-auto'>
            {navItems.map((item)=>(
                item.active ? (
                  <li key={item.name}>
                      <button  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={()=> navigate(item.slug)}>{item.name}</button>
                  </li>
                ): null
            ))}

            { authstatus && (
              <li>
                <Logoutbtn/>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
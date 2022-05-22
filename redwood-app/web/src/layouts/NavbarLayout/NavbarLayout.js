import { Link, routes } from '@redwoodjs/router'

const NavbarLayout = ({ children }) => {
  return (
    <>
      <div className="navbar">
        <nav>
          <ul>
            <li>
              <Link to={routes.home()}>(:3)</Link>
            </li>
            <li>
              <Link to={routes.home()}>Log in</Link>
            </li>
            <li>
              <Link to={routes.mine()}>Mine</Link>
            </li>
            <li>
              <Link to={routes.home()}>Trade</Link>
            </li>
          </ul>
        </nav>
      </div>
      <main>{children}</main>
    </>
  )
}

export default NavbarLayout

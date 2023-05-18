import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="flex justify-center w-full py-4 border-b drop-shadow">
        <nav>
          <ul className="flex gap-6 ">
            <li className="text-black hover:text-indigo-400">
              <Link to="/">Home</Link>
            </li>
            <li className="text-black hover:text-indigo-400">
              <Link to="/students">Students</Link>
            </li>
          </ul>
        </nav>
      </div>

      <Outlet />
    </>
  );
};

export default Layout;

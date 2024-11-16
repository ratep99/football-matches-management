import {NavLink} from 'react-router-dom'
import ball from '../assets/images/ball.png'
const Navbar = () => {
  return (
    <nav className="bg-[#000071] border-b-2 border-[#ff0000]">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="flex h-20 items-center justify-between">
        <div
          className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >
         
          <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
          <img
              className="h-10 w-auto"
              src={ball}
              alt="Ball"
            />
            <span className="hidden md:block text-white text-2xl font-bold ml-2"
              >Football Events</span
            >
          </NavLink>
          <div className="md:ml-auto">
            <div className="flex space-x-2">
              <NavLink
                to="/"
                className="text-white font-bold hover:bg-[#FF0000] hover:text-white rounded-md px-3 py-2"
                >Home</NavLink>
              <NavLink
                to="/events"
                className="text-white font-bold hover:bg-[#FF0000] hover:text-white rounded-md px-3 py-2"
                >Events
                </NavLink>
              <NavLink
                to="/add-event"
                className="text-white font-bold hover:bg-[#FF0000] hover:text-white rounded-md px-3 py-2"
                >Add Event</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  )
}
export default Navbar;
import React from 'react'

const Header = () => {
  return (
    <section className="bg-gradient-to-b from-[#000071] to-[#000091] py-20 mb-5">
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="text-center">
      <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl font-sans">
          Welcome to the
        </h1>
        <h1 className="text-4xl font-extrabold text-[#ff0000] sm:text-5xl md:text-6xl font-sans">
          Football events page
        </h1>
        <p className="my-4 text-xl text-white font-bold">
          Place where you can find all important football events!
        </p>
      </div>
    </div>
  </section>

  )
}

export default Header
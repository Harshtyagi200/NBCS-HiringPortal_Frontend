import React from 'react'

function Home() {
  return (
    <div className="bg-transparent min-h-screen flex items-center justify-center">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 px-6">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl drop-shadow-lg">
            Welcome to NBCS
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-200 drop-shadow-md">
            Your premier job placement and recruitment portal. Connect with opportunities and grow your career with us.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/apply"
              className="rounded-md bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition"
            >
              Apply Now
            </a>
            <a href="/about" className="text-sm font-semibold leading-6 text-orange-400 hover:text-orange-300 drop-shadow-md">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

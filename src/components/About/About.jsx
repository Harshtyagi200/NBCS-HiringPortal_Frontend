import React from 'react'

function About() {
  return (
    <div className="bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-orange-400 drop-shadow-md">About NBCS</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl drop-shadow-lg">
                Building Better Careers
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-200 drop-shadow-md">
                NBCS Technologies is committed to connecting talented professionals with outstanding career opportunities. Our placement process is designed to ensure the best match between candidates and employers.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-200 lg:max-w-none">
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <svg className="h-6 w-6 text-orange-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <dt className="font-semibold text-white drop-shadow-md">Expert Recruitment</dt>
                    <dd className="mt-1">Our team has years of experience in identifying and placing top talent.</dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <svg className="h-6 w-6 text-orange-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <dt className="font-semibold text-white drop-shadow-md">Secure Process</dt>
                    <dd className="mt-1">Your information and applications are handled with complete confidentiality.</dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <svg className="h-6 w-6 text-orange-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                      <path fillRule="evenodd" d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <dt className="font-semibold text-white drop-shadow-md">Database Backups</dt>
                    <dd className="mt-1">We ensure data security with regular backups and comprehensive protection measures.</dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://www.wickedtemplates.com/images/library/shadow-ui-kit.webp"
              alt="Product screenshot"
              className="w-1xl max-w-1rem rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

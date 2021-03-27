import { signIn, signOut, useSession } from "next-auth/client";
import { useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      <HeroUnit>
        <NavTools></NavTools>
      </HeroUnit>
      {/* <FeatureSection></FeatureSection> */}
    </div>
  );
}

export function NavTools() {
  let [open, setOpen] = useState(false);
  let tools = [
    {
      name: "Home",
      target: "_self",
      href: "/",
    },
    {
      name: "EffectNode",
      target: "_blank",
      href: "https://effectnode.com/",
    },
  ];
  return (
    <>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav
          className="relative flex items-center justify-between sm:h-10 lg:justify-start"
          aria-label="Global"
        >
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <a href="#">
                <span className="sr-only">Workflow</span>
                {/* <img
                  className="h-8 w-auto sm:h-10"
                  src="/"
                /> */}
                <img
                  className="h-14 w-14 cursor-pointer"
                  src="/img/effectnode-logo.svg"
                  alt="EffectNode"
                />
              </a>
              <div className="-mr-2 flex items-center md:hidden">
                <button
                  onClick={() => setOpen((s) => !s)}
                  type="button"
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
            {tools.map((t) => {
              return (
                <a
                  key={t.href + t.name}
                  href={t.href}
                  target={t.target}
                  className="font-medium text-gray-500 hover:text-gray-900"
                >
                  {t.name}
                </a>
              );
            })}

            {/*


                <a
                  href="https://effectnode.com/"
                  target="_blank"
                  className="font-medium text-gray-500 hover:text-gray-900"
                >
                  What is Effect Node?
                </a>

                <a
                  href="#"
                  className="font-medium text-gray-500 hover:text-gray-900"
                >
                  Marketplace
                </a>

                <a
                  href="#"
                  className="font-medium text-gray-500 hover:text-gray-900"
                >
                  Company
                </a> */}

            <span
              dhref="#"
              className="font-medium text-gray-600 hover:text-gray-500"
            >
              <LoginItem></LoginItem>
            </span>
          </div>
        </nav>
      </div>

      {open && (
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <div>
                {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-gray-600.svg" alt=""> */}
              </div>
              <div className="-mr-2">
                <button
                  type="button"
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
                >
                  <span className="sr-only">Close main menu</span>
                  {/* <!-- Heroicon name: outline/x --> */}
                  <svg
                    onClick={() => setOpen((s) => !s)}
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {tools.map((t) => {
                return (
                  <a
                    key={t.href + t.name}
                    href={t.href}
                    target={t.target}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    {t.name}
                  </a>
                );
              })}

              {/* <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Features
            </a>

            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Marketplace
            </a>

            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Company
            </a> */}
            </div>
            <a
              href="#"
              className="block w-full px-5 py-3 text-center font-medium text-gray-600 bg-gray-50 hover:bg-gray-100"
            >
              <LoginItem></LoginItem>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export function HeroUnit({ children }) {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          {children}

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">VFX WebGL Tools </span>
                <span className="block text-gray-600 xl:inline">
                  Front End Developers
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Thank you Jesus for all your technical inspirations.
              </p>
              <CallToAction></CallToAction>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          ddsrc="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          src={"/img/hero.png"}
          alt=""
        />
      </div>
    </div>
  );
}

// <!-- This example requires Tailwind CSS v2.0+ --><!-- This example requires Tailwind CSS v2.0+ -->
export function FeatureSection() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-gray-600 font-semibold tracking-wide uppercase">
            Transactions
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to send money
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gray-500 text-white">
                  {/* <!-- Heroicon name: outline/globe-alt --> */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Competitive exchange rates
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maiores impedit perferendis suscipit eaque, iste dolor
                cupiditate blanditiis ratione.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gray-500 text-white">
                  {/* <!-- Heroicon name: outline/scale --> */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  No hidden fees
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maiores impedit perferendis suscipit eaque, iste dolor
                cupiditate blanditiis ratione.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gray-500 text-white">
                  {/* <!-- Heroicon name: outline/lightning-bolt --> */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Transfers are instant
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maiores impedit perferendis suscipit eaque, iste dolor
                cupiditate blanditiis ratione.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gray-500 text-white">
                  {/* <!-- Heroicon name: outline/annotation --> */}
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Mobile notifications
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maiores impedit perferendis suscipit eaque, iste dolor
                cupiditate blanditiis ratione.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export function LoginItem() {
  const [session, loading] = useSession();

  // if (loading) {
  //   return (
  //     <div className="h-full w-full flex justify-center items-center bg-white">
  //       <div className="loader">Loading...</div>
  //     </div>
  //   );
  // }

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {!session && (
        <>
          <button onClick={signIn}>Login / Sign up</button>
        </>
      )}

      {session && (
        <>
          {/* Welcome back, {session.user.name}!
          <br /> */}
          <button onClick={signOut}>Logout</button>
        </>
      )}
    </>
  );
}

export function CallToAction() {
  const [session, loading] = useSession();

  // if (loading) {
  //   return (
  //     <div className="h-full w-full flex justify-center items-center bg-white">
  //       <div className="loader">Loading...</div>
  //     </div>
  //   );
  // }

  if (loading) {
    return (
      <>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <a
              href="#"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Loading...
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {!session && (
        <>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 md:py-4 md:text-lg md:px-10"
              >
                Get started
              </a>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 md:py-4 md:text-lg md:px-10"
              >
                Live demo
              </a>
            </div>
          </div>
        </>
      )}

      {session && (
        <>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <Link href="/home">
                <div className=" cursor-pointer w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 md:py-4 md:text-lg md:px-10">
                  My Profile
                </div>
              </Link>
            </div>
            {/* <div className="mt-3 sm:mt-0 sm:ml-3">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 md:py-4 md:text-lg md:px-10"
              >
                Live demo
              </a>
            </div> */}
          </div>
        </>
      )}
    </>
  );
}

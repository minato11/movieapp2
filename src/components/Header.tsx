'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import ThemeToggle from '../../../movies-app/components/ThemeToggle';
import React from 'react';
import { Genres } from '@/types/types';

interface HeaderProps {
  genres: Genres[];
  handleGenreChange: (newGenreId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ genres, handleGenreChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="dark:bg-dark">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-full items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only"></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 dark:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 dark:text-white">
              Genres
              <ChevronDownIcon
                aria-hidden="true"
                className="h-5 w-5 flex-none text-black dark:text-white"
              />
            </PopoverButton>

            {genres && genres.length > 0 && (
              <PopoverPanel
                  transition
                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="p-1">
                  {genres.map((genre) => (
                    <div
                      key={genre.id}
                      onClick={() => handleGenreChange(genre.id.toString())}
                      className="group relative flex cursor-pointer items-center gap-x-6 rounded-lg p-1.5 text-sm leading-6 hover:bg-gray-50"
                    >
                      <span>{genre.name}</span>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            )}
          </Popover>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            Favourite Movies
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            Profile
          </a>
          <div className="relative mb-4 flex w-full flex-wrap items-stretch dark:text-white md:w-96"></div>
          <div className="hidden lg:flex lg:flex-1">
            <a href="#" className="">
              <ThemeToggle />
            </a>
          </div>
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 dark:bg-dark sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between dark:bg-dark">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only"></span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 dark:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-white"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root h-full dark:bg-medium">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3 relative">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:accent-transparent dark:text-blue-50">
                    Genres
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                  {genres && genres.length > 0 && (
                    <DisclosurePanel
                      transition
                      className="absolute  top-full z-10 mt-3 w-screen max-w-md overflow-hidden  bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {genres.map((genre) => (
                        <DisclosureButton
                          key={genre.id}
                          onClick={() => handleGenreChange(genre.id.toString())}
                          className="group relative flex cursor-pointer items-center gap-x-6 rounded-lg p-1.5 text-sm  leading-6 hover:bg-gray-50"
                        >
                          <span>{genre.name}</span>
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  )}
                </Disclosure>

                <a
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-transparent dark:text-blue-50"
                >
                  Favourite movies
                </a>
                <a
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-transparent dark:text-blue-50"
                >
                  Profile
                </a>
              </div>
            </div>
            <div className="py-6">
              <a href="#" className="">
                <ThemeToggle />
              </a>
            </div>
            <div className="py-6">
              <a
                href="/"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-transparent dark:text-blue-50"
              >
                Log in
              </a>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;

'use client'

import {useEffect, useState} from 'react'
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
} from '@headlessui/react'
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import {ChevronDownIcon, PhoneIcon, PlayCircleIcon} from '@heroicons/react/20/solid'
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

const GenreList = () => {
    const [genres, setGenres] = useState([]);


    const getGenres = async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=f77adf9e4103d3a683d71fa4c240152a');
            if (!response.ok) {
                throw new Error('Network response error');
            }
            const json = await response.json();
            setGenres(json.genres);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getGenres();
    }, []);


    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="dark:bg-dark ">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only"></span>
                        <img alt="" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                             className="h-8 w-auto"/>
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6"/>
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <Popover className="relative">
                        <PopoverButton
                            className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                            Genres
                            <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400"/>
                        </PopoverButton>

                        <PopoverPanel
                            transition
                            className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in "
                        >
                            <div className="p-1">
                                {genres.map((genre) => (
                                    <div
                                        key={genre.id}
                                        className="group relative flex items-center gap-x-6 rounded-lg p-1.5 text-sm leading-6 hover:bg-gray-50"
                                    >
                                        <ol>{genre.name}</ol>
                                    </div>
                                ))}
                            </div>

                        </PopoverPanel>
                    </Popover>
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                        Favourite Movies
                    </a>
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                        Profile
                    </a>
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch md:w-96 dark:text-white">
                    </div>
                </PopoverGroup>
                <div className="hidden lg:flex lg:flex-1 ">
                    <a href="#" className="">
                        <ThemeToggle/>
                    </a>
                </div>
                <
                    div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="/" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10"/>
                <DialogPanel
                    className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ">
                    <div className="flex items-center justify-between">
                        <a href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only"></span>
                            <img
                                alt=""
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-8 w-auto"
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only ">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6"/>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    <DisclosureButton
                                        className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                        Genres
                                        <ChevronDownIcon aria-hidden="true"
                                                         className="h-5 w-5 flex-none group-data-[open]:rotate-180"/>
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 space-y-2">
                                        {genres.map((genre) => (
                                            <DisclosureButton
                                                key={genre.id}
                                                as="a"
                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            >
                                                <Link href='#'>
                                                    {genre.name}
                                                </Link>
                                            </DisclosureButton>
                                        ))}
                                    </DisclosurePanel>
                                </Disclosure>
                                <a
                                    href="/"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Favourite movies
                                </a>
                                <a
                                    href="/"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Profile
                                </a>
                            </div>

                        </div>
                        <div className="py-6">
                            <a
                                href="#"
                                className=""
                            >
                                <ThemeToggle/>
                            </a>
                        </div>
                        <div className="py-6">
                            <a
                                href="/"
                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 "
                            >
                                Log in
                            </a>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}


export default GenreList
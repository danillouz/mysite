import { useState } from "preact/hooks"
import Link from "./Link"

import type { FunctionalComponent } from "preact"

// NOTE: this component used to accept Link as children, but that caused some
// issues (it didn't load) in Safari after deploying:
//   - Disabling the cache in Safari (network devtools) loaded the components
//   - For some reason it did work locally (also when building + previewing)
//
// Perhaps I was using the `client:load` directories incorrectly (i.e. in Nav +
// Link), or perhaps it was a bug. In any case, the Nav component currently
// works without issues. But the downside is that the "component API" is now
// less nice IMO..
const Nav: FunctionalComponent<{
  title: string
  pathname: string
}> = ({ title, pathname }) => {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState<boolean>(false)

  const onMobileMenuClick = () => {
    setMobileMenuIsOpen((s) => !s)
  }

  return (
    <>
      <nav class="h-8 flex items-center justify-between md:justify-start md:space-x-8 lg:space-x-0 px-4 sm:px-8">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <span aria-hidden="true" class="font-semibold">
            {title}
          </span>
        </div>

        <div class="-mr-2 md:hidden">
          <button
            class="flex items-center justify-center h-8 px-2 focusable focus:ring-inset"
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuIsOpen}
            onClick={onMobileMenuClick}
          >
            <span class="sr-only">
              {mobileMenuIsOpen ? "Close menu" : "Open menu"}
            </span>

            {mobileMenuIsOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentcolor"
                aria-hidden="true"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentcolor"
                aria-hidden="true"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 9h16.5m-16.5 6.75h16.5"
                ></path>
              </svg>
            )}
          </button>
        </div>

        <div class="hidden md:flex items-center">
          <Link href="/" pathname={pathname}>
            Home
          </Link>

          <Link href="/posts" pathname={pathname}>
            Posts
          </Link>

          <Link href="/feeds" pathname={pathname}>
            Feeds
          </Link>
        </div>

        <div class="hidden items-center justify-end md:flex md:flex-1 lg:w-0" />
      </nav>

      {mobileMenuIsOpen && (
        <nav class="md:hidden pt-1 pb-4" id="mobile-menu">
          <Link href="/" pathname={pathname}>
            Home
          </Link>

          <Link href="/posts" pathname={pathname}>
            Posts
          </Link>

          <Link href="/feeds" pathname={pathname}>
            Feeds
          </Link>
        </nav>
      )}
    </>
  )
}

export default Nav

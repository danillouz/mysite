import { useState, useEffect } from "preact/hooks"

import type { FunctionalComponent, ComponentChildren } from "preact"

const Link: FunctionalComponent<{
  href: string
  pathname: string
  children: ComponentChildren
}> = ({ href, pathname, children }) => {
  const [isActive, setIsActive] = useState<boolean>(false)

  useEffect(() => {
    let match = false
    if (href === "/") {
      match = pathname === href
    } else {
      match = pathname.includes(href)
    }
    setIsActive(match)
  }, [href, pathname])

  const className =
    "flex items-center h-8 px-4 sm:px-8 md:px-6 focusable focus:ring-inset"
  return (
    <a
      href={href}
      aria-current={isActive ? "page" : undefined}
      class={
        isActive
          ? // dark:bg-zinc-700
            `${className} bg-[#000] dark:bg-[#3f3f46] text-[#fff]`
          : className
      }
    >
      {children}
    </a>
  )
}

export default Link

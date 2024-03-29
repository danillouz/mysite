import type { ComponentChildren, FunctionalComponent } from "preact"

const Details: FunctionalComponent<{
  open?: boolean
  summary: string
  children: ComponentChildren
}> = ({ open = false, summary, children }) => {
  return (
    <details open={open}>
      <summary class="z-10 px-1 py-3 sticky top-8 md:top-[46px] bg-danos-primary dark:bg-danos-primary-inverted border-b border-danos-primary dark:border-danos-primary-inverted cursor-pointer focus:focusable focus:ring-inset page-subheading text-lg">
        {summary}
      </summary>

      {children}
    </details>
  )
}

export default Details

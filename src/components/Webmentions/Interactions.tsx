import type { FunctionalComponent, VNode } from "preact"
import type { Webmention } from "./types"

const Interactions: FunctionalComponent<{
  heading: VNode
  mentions: Webmention[]
}> = ({ heading, mentions }) => {
  return (
    <div>
      <span class="flex items-center justify-center gap-1 ml-0 mt-6 mb-2 font-sans font-medium text-center">
        {heading}
      </span>

      <ul class="flex items-center justify-center flex-wrap gap-1 m-0 my-2 p-0">
        {mentions.map((wm) => {
          return (
            <li key={wm["wm-id"]} class="list-none m-0 p-0">
              <a
                href={wm["wm-source"]}
                title="Go to webmention source"
                class="inline-block"
              >
                <img
                  alt=""
                  src={wm.author.photo}
                  class="inline-block w-12 h-12 m-0"
                />
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Interactions

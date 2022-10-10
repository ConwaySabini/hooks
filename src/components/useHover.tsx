import { RefObject, useState, useRef } from 'react'

import { useEventListener } from 'usehooks-ts'

function useHover<T extends HTMLElement = HTMLElement>(
    elementRef: RefObject<T>,
): boolean {
    const [value, setValue] = useState<boolean>(false)

    const handleMouseEnter = () => setValue(true)
    const handleMouseLeave = () => setValue(false)

    useEventListener('mouseenter', handleMouseEnter, elementRef)
    useEventListener('mouseleave', handleMouseLeave, elementRef)

    return value
}

export default useHover








function Component() {
    const hoverRef = useRef(null)
    const isHover = useHover(hoverRef)

    return (
        <div ref={hoverRef}>
            {`The current div is ${isHover ? `hovered` : `unhovered`}`}
        </div>
    )
}

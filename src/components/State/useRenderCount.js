import { useEffect, useRef } from "react"

export default function useRenderCount() {
    const count = useRef(1)
    useEffect(() => count.current++)
    return count.current
}





function RenderCountComponent() {
    const [boolean, toggle] = useToggle(false)

    const renderCount = useRenderCount()

    return (
        <>
            <div>{boolean.toString()}</div>
            <div>{renderCount}</div>
            <button onClick={toggle}>Toggle</button>
        </>
    )
}

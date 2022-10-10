import { useEffect, useRef, useState } from "react"
import useRenderCount from "../State/useRenderCount"
import useToggle from "../useToggle"

export default function useDebugInformation(componentName: string, props: any) {
    const count = useRenderCount()
    const changedProps = useRef({})
    const previousProps = useRef(props)
    const lastRenderTimestamp = useRef(Date.now())

    const propKeys = Object.keys({ ...props, ...previousProps })
    changedProps.current = propKeys.reduce((obj, key) => {
        if (props[key] === previousProps.current[key]) return obj
        return {
            ...obj,
            [key]: { previous: previousProps.current[key], current: props[key] },
        }
    }, {})
    const info = {
        count,
        changedProps: changedProps.current,
        timeSinceLastRender: Date.now() - lastRenderTimestamp.current,
        lastRenderTimestamp: lastRenderTimestamp.current,
    }

    useEffect(() => {
        previousProps.current = props
        lastRenderTimestamp.current = Date.now()
        console.log("[debug-info]", componentName, info)
    })

    return info
}





function DebugInformationComponent() {
    const [boolean, toggle] = useToggle(false)
    const [count, setCount] = useState(0)

    return (
        <>
            <ChildComponent boolean={boolean} count={count} />
            <button onClick={toggle}>Toggle</button>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>
                Increment
            </button>
        </>
    )
}

function ChildComponent(props: any) {
    const info = useDebugInformation("ChildComponent", props)

    return (
        <>
            <div>{props.boolean.toString()}</div>
            <div>{props.count}</div>
            <div>{JSON.stringify(info, null, 2)}</div>
        </>
    )
}

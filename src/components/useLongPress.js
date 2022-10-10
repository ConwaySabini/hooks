

import useEventListener from "../13-useEventListener/useEventListener"
import useTimeout from "../2-useTimeout/useTimeout"
import useEffectOnce from "../20-useEffectOnce/useEffectOnce"

export default function useLongPress(ref, cb, { delay = 250 } = {}) {
    const { reset, clear } = useTimeout(cb, delay)
    useEffectOnce(clear)

    useEventListener("mousedown", reset, ref.current)
    useEventListener("touchstart", reset, ref.current)

    useEventListener("mouseup", clear, ref.current)
    useEventListener("mouseleave", clear, ref.current)
    useEventListener("touchend", clear, ref.current)
}



function LongPressComponent() {
    const elementRef = useRef()
    useLongPress(elementRef, () => alert("Long Press"))

    return (
        <div
            ref={elementRef}
            style={{
                backgroundColor: "red",
                width: "100px",
                height: "100px",
                position: "absolute",
                top: "calc(50% - 50px)",
                left: "calc(50% - 50px)",
            }}
        />
    )
}

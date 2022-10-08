import { useEffect, useRef } from 'react'


import { useIsomorphicLayoutEffect } from 'usehooks-ts'


function useInterval(callback: () => void, delay: number | null) {

    const savedCallback = useRef(callback)


    // Remember the latest callback if it changes.

    useIsomorphicLayoutEffect(() => {

        savedCallback.current = callback

    }, [callback])


    // Set up the interval.

    useEffect(() => {

        // Don't schedule if no delay is specified.

        // Note: 0 is a valid value for delay.

        if (!delay && delay !== 0) {

            return

        }


        const id = setInterval(() => savedCallback.current(), delay)


        return () => clearInterval(id)

    }, [delay])

}


export default useInterval





import { ChangeEvent, useState } from 'react'




function Component() {

    // The counter

    const [count, setCount] = useState<number>(0)

    // Dynamic delay

    const [delay, setDelay] = useState<number>(1000)

    // ON/OFF

    const [isPlaying, setPlaying] = useState<boolean>(false)


    useInterval(

        () => {

            // Your custom logic here

            setCount(count + 1)

        },

        // Delay in milliseconds or null to stop it

        isPlaying ? delay : null,

    )


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        setDelay(Number(event.target.value))

    }


    return (

        <>

            <h1>{count}</h1>

            <button onClick={() => setPlaying(!isPlaying)}>

                {isPlaying ? 'pause' : 'play'}

            </button>

            <p>

                <label htmlFor="delay">Delay: </label>

                <input

                    type="number"

                    name="delay"

                    onChange={handleChange}

                    value={delay}

                />

            </p>

        </>

    )

}

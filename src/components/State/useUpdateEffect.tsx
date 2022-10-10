import { DependencyList, EffectCallback, useEffect } from 'react'

import { useIsFirstRender } from 'usehooks-ts'

// this hook is useEffect, except it avoids executing the effect on the first render
function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
    const isFirst = useIsFirstRender()

    useEffect(() => {
        if (!isFirst) {
            return effect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}

export default useUpdateEffect

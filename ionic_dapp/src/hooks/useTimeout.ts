import { useRef, useEffect } from 'react';

function useTimeout(callback: () => void, delay: number | null) {
    const savedCallback = useRef<() => void | null>();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            if (typeof savedCallback?.current !== 'undefined') {
                savedCallback?.current();
            }
        }
        if (delay !== null) {
            const id = setTimeout(tick, delay);
            return () => clearTimeout(id);
        }
    }, [delay])
}

export default useTimeout;
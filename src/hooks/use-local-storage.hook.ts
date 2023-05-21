import {useEffect, useState} from "react";

import {ISetState} from "../types/set-state.type";

const useLocalStorage = <T>(key: string, init: T): [T, ISetState<T>] => {
    const [value, setValue] = useState<T>(() => {
        const storedValue = localStorage.getItem(key)
        return storedValue ? JSON.parse(storedValue) : init
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
};

export {
    useLocalStorage
};

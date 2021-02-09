import { useEffect, useRef, useState } from "react";

export const useIntersect = ({ root = null, rootMargin, threshold = 0 }) => {
    const [entry, updateEntry] = useState({});
    const [node, setNode] = useState(null);

    const observer = useRef(
        new window.IntersectionObserver(([entry]) => updateEntry(entry), {
            root,
            rootMargin,
            threshold,
        })
    );

    useEffect(() => {
        const { current: currentObserver } = observer;
        currentObserver.disconnect();

        if (node) currentObserver.observe(node);

        return () => currentObserver.disconnect();
    }, [node]);

    return [setNode, entry];
};

//Credits to Justin Travis Waith-Mair blog: https://medium.com/the-non-traditional-developer post: https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SocialkiText({ text }) {
    const [description, setDescription] = useState([]);
    useEffect(() => {
        const parseText = () => {
            const mentionRegex = /^@\w+$/;
            const tagRegex = /^#\w+$/;

            const words = text.replace(/(\r\n|\n|\r)/gm, " ").split(" ");

            const mentions = words.filter((word) =>
                mentionRegex.test(word.toLowerCase())
            );
            const tags = words.filter((word) =>
                tagRegex.test(word.toLowerCase())
            );

            words.forEach((word, i) => {
                if (tags && tags.includes(word)) {
                    //tags
                    words[i] = (
                        <Link key={i} to={`/search/${word}`}>
                            {word + " "}
                        </Link>
                    );
                } else if (mentions && mentions.includes(word)) {
                    //mentions
                    words[i] = (
                        <Link key={i} to={`/profile/${word.replace("@", "")}`}>
                            {word}
                        </Link>
                    );
                } else if (
                    //LINKS
                    //eslint-disable-next-line
                    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(
                        word
                    )
                ) {
                    words[i] = (
                        <a key={i} href={word} target="_blank" rel="noreferrer">
                            {word + " "}
                        </a>
                    );
                } else {
                    words[i] = word + " ";
                }
            });
            setDescription(words);
        };
        parseText();
    }, [text]);

    return <>{description}</>;
}

export default SocialkiText;

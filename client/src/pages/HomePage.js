import React from "react";
import Header from "../components/Header";
import Socialki from "../components/Socialki";

function HomePage() {
    return (
        <div>
            <Header />
            <section>
                <div className="container">
                    <Socialki
                        socialki={{
                            description:
                                "I just went to the store it was great #fun",
                            image: undefined,
                            user: { username: "john" },
                            liked: false,
                        }}
                    />
                    <Socialki
                        socialki={{
                            description:
                                "I just went to the store it was great #fun",
                            image: undefined,
                            user: { username: "john" },
                            liked: false,
                        }}
                    />
                    <Socialki
                        socialki={{
                            description:
                                "I just went to the store it was great #fun",
                            image: undefined,
                            user: { username: "john" },
                            liked: false,
                        }}
                    />
                    <Socialki
                        socialki={{
                            description:
                                "I just went to the store it was great #fun",
                            image: undefined,
                            user: { username: "john" },
                            liked: false,
                        }}
                    />
                    <Socialki
                        socialki={{
                            description:
                                "I just went to the store it was great #fun",
                            image: undefined,
                            user: { username: "john" },
                            liked: false,
                        }}
                    />
                    <Socialki
                        socialki={{
                            description:
                                "I just went to the store it was great #fun",
                            image: "https://via.placeholder.com/1080x1500",
                            user: { username: "john" },
                            liked: false,
                        }}
                    />
                    <Socialki
                        socialki={{
                            description: undefined,
                            image: "https://via.placeholder.com/1080x1500",
                            user: { username: "john" },
                            liked: false,
                        }}
                    />
                </div>
            </section>
        </div>
    );
}

export default HomePage;

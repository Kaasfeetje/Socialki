import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostAction } from "../actions/postActions";
import Header from "../components/Header";
import Socialki from "../components/Socialki";

function SocialkiPage({ match }) {
    const dispatch = useDispatch();

    const fetchPost = useSelector((state) => state.fetchPost);
    const { post } = fetchPost;

    useEffect(() => {
        dispatch(fetchPostAction(match.params.id));
    }, [dispatch, match.params.id]);

    return (
        <div>
            <Header />
            {post && (
                <div className="container">
                    <Socialki socialki={post} />
                </div>
            )}
        </div>
    );
}

export default SocialkiPage;

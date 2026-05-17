//lista de desejos
import React, { useEffect } from "react";
import { router } from "expo-router";

export default function Wishlist() {
    useEffect(() => {
        router.replace("/list/wishlist");
    }, []);

    return null;
}
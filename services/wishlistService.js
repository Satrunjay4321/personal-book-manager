import axios from "axios";

export const getWishlist = () => {
    return axios.get("/api/wishlist");
};

export const addToWishlist = (data) => {
    return axios.post("/api/wishlist", data);
};

export const getWishlistBook = (id) => {
    return axios.get(`/api/wishlist/${id}`);
};

export const deleteWishlistBook = (id) => {
    return axios.delete(`/api/wishlist/${id}`);
};


// Notify Navbar when wishlist changes
export const notifyWishlistUpdated = () => {

    if (typeof window !== "undefined") {

        window.dispatchEvent(
            new Event("wishlistUpdated")
        );

    }

};
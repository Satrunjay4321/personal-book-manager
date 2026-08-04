export const validateBook = ({ title, author }) => {
    if (!title?.trim())
        return "Title is required";

    if (!author?.trim())
        return "Author is required";

    return null;
};
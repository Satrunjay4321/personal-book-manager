export function validateWishlist(data) {

    const {
        title,
        author,
        summary,
        pageCount,
    } = data;

    if (!title?.trim()) {
        return "Title is required.";
    }

    if (title.trim().length < 2) {
        return "Title must contain at least 2 characters.";
    }

    if (!author?.trim()) {
        return "Author is required.";
    }

    if (author.trim().length < 2) {
        return "Author name is too short.";
    }

    if (summary && summary.length > 1000) {
        return "Summary cannot exceed 1000 characters.";
    }

    if (
        pageCount === undefined ||
        pageCount === null ||
        pageCount === ""
    ) {
        return "Page count is required.";
    }

    if (Number(pageCount) <= 0) {
        return "Page count must be greater than 0.";
    }

    return null;
}
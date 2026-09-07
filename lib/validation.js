export function validateBook(data) {

    const {
        title,
        author,
        summary,
        pageCount,
        pagesRead,
        status,
    } = data;

    // -------------------------------
    // Title
    // -------------------------------

    if (!title?.trim()) {
        return "Title is required.";
    }

    if (title.trim().length < 2) {
        return "Title must contain at least 2 characters.";
    }

    // -------------------------------
    // Author
    // -------------------------------

    if (!author?.trim()) {
        return "Author is required.";
    }

    if (author.trim().length < 2) {
        return "Author name is too short.";
    }

    // -------------------------------
    // Summary
    // -------------------------------

    if (
        summary &&
        summary.length > 1000
    ) {
        return "Summary cannot exceed 1000 characters.";
    }

    // -------------------------------
    // Page Count
    // -------------------------------

    if (
        pageCount === undefined ||
        pageCount === null ||
        pageCount === ""
    ) {
        return "Page count is required.";
    }

    const totalPages = Number(pageCount);

    if (!Number.isFinite(totalPages)) {
        return "Page count must be a valid number.";
    }

    if (totalPages <= 0) {
        return "Page count must be greater than 0.";
    }

    // -------------------------------
    // Pages Read
    // -------------------------------

    const readPages =
        pagesRead === undefined ||
        pagesRead === null ||
        pagesRead === ""
            ? 0
            : Number(pagesRead);

    if (!Number.isFinite(readPages)) {
        return "Pages read must be a valid number.";
    }

    if (readPages < 0) {
        return "Pages read cannot be negative.";
    }

    if (readPages > totalPages) {
        return "Pages read cannot exceed total pages.";
    }

    // -------------------------------
    // Status
    // -------------------------------

    const validStatus = [
        "Want to Read",
        "Reading",
        "Completed",
    ];

    if (!validStatus.includes(status)) {
        return "Invalid status selected.";
    }

    return null;
}
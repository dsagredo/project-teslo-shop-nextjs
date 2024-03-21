export const generatePagination = (
    currentPage: number,
    totalPages: number
): (string | number)[] => {
    if (totalPages < 7) {
        return Array.from(
            { length: totalPages },
            (_: unknown, i: number): number => i + 1
        );
    }

    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 2,
        '...',
        totalPages,
    ];
};

export const sleep = (seconds: number = 1): Promise<unknown> => {
    return new Promise((resolve: (value: unknown) => void): void => {
        setTimeout((): void => {
            resolve(true);
        }, seconds * 1000);
    });
};

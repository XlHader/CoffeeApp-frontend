export const validationErrorsToString = (errors: any) => {
    const errorMessages = [];

    for (const value of Object.values(errors)) {
        errorMessages.push(value);
    }

    return errorMessages.join('\n');
}
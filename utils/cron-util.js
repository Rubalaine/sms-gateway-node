export const genExpression = (time) => {
    const [hours, minutes] = time.split(':');
    return `${minutes} ${hours} * * *`;
}
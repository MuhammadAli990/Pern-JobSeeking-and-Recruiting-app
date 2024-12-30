export const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero if day < 10
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based, so add 1
    const year = currentDate.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}
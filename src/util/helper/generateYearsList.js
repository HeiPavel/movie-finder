export const generateYearList = () => {
    const listOfYears = [];
    const yearOfTheFirstMovie = 1885;
    const date = new Date();
    const year = date.getFullYear();
    for (let i = year; i >= yearOfTheFirstMovie; i--) {
        listOfYears.push(i);
    }
    return listOfYears;
}
export const legalAgeValidation = (value: any): boolean => {
    const MINIMUM_AGE = 18;

    try {
        const birthdate = new Date(value);
        const birthdateYear = birthdate.getFullYear()
        const birthdateMonth = birthdate.getMonth() + 1
        const birthdateDate = birthdate.getDate()

        const currentDate = new Date();
        const currentDateYear = currentDate.getFullYear()
        const currentDateMonth = currentDate.getMonth() + 1
        const currentDateDate = currentDate.getDate()

        let edad = currentDateYear - birthdateYear;

        if (
            birthdateMonth > currentDateMonth ||
            (birthdateMonth === currentDateMonth && birthdateDate > currentDateDate)
        ) {
            edad--;
        }

        return edad >= MINIMUM_AGE;
    } catch (error) {
        return false;
    }
}

export const formatDate = (date: string) => {
    const dateToFormat = new Date(date)

    let year = dateToFormat.getFullYear();
    let month = dateToFormat.getMonth() + 1;
    let day = dateToFormat.getDate();

    let newYear = '';
    let newMonth = '';
    let newDay = '';

    newYear = year.toString();
    (month < 10) ? newMonth = '0' + month.toString() : newMonth = month.toString();
    (day < 10) ? newDay = '0' + day.toString() : newDay = day.toString();

    return `${newYear}-${newMonth}-${newDay}`
}

export const formatDateToCalendar = (date: string) => {
    const dateToFormat = date.split('-')
    return `${dateToFormat[2]}-${dateToFormat[1]}-${dateToFormat[0]}`
}
import { DateTime } from "luxon"


export const formatToISO = (date: string) => {
    date = date.replace(/\//g, '');
    return DateTime.fromFormat(date, 'ddMMyyyy').toString()
}
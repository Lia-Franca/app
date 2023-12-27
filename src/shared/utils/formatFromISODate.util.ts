import { DateTime } from "luxon"

export const formatFromISO = (date: string) => {
    const parsedDate = DateTime.fromISO(date, { zone: 'utc' });

        if (parsedDate.isValid) {
            return DateTime.fromISO(date).toFormat('dd/MM/yyyy')
        } 
        return date
}
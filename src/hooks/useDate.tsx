import { useEffect, useState } from "react";

// returns date and setDate, where date is always updated at midnight local time
export default function useDate() {
    const [date, setDate] = useState<Date>(new Date());

    const updateDate = (): void => {// new date = tomorrow's date at T00:00:00
        setDate(d => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1));
    }

    // calculates time left till the end of the day, used to update the date when the day is over
    const getTimeTillNextDay = (date: Date): number => {// Note: returns time in ms
        const nearestMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        return nearestMidnight.getTime() - date.getTime();
    }

    useEffect(() => {
        const timeoutId: number = setTimeout(() => {// updates date when local time is T00:00:00 (at midnight)
            updateDate();
        }, getTimeTillNextDay(date));

        return () => {
            clearTimeout(timeoutId);
        }
    }, [date]);// re-runs after each date update, to schedule the next date update

    return { date, setDate };
}


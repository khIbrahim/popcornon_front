export function formatDateLocal(date: Date): string {
    return date.toLocaleDateString("fr-CA");
}

export function getNext7Days(startDate: Date = new Date()): Date[] {
    const base = new Date(startDate);
    base.setHours(0, 0, 0, 0);

    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(base);
        d.setDate(base.getDate() + i);
        days.push(d);
    }
    return days;
}

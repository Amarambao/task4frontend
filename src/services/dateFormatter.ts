export class DateFormatter {
    private formatDateOnly(dateString: string): string {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    private formatDateTime(dateTimeUtcString: string): string {
        const utcDateTime = new Date(dateTimeUtcString);

        const day = utcDateTime.getDate().toString().padStart(2, '0');
        const month = (utcDateTime.getMonth() + 1).toString().padStart(2, '0');
        const year = utcDateTime.getFullYear();
        const hours = utcDateTime.getHours().toString().padStart(2, '0');
        const minutes = utcDateTime.getMinutes().toString().padStart(2, '0');

        return `${hours}:${minutes} ${day}.${month}.${year}`;
    }

    format(dateInput: string | Date | null): string {
        if (!dateInput) return '';

        let dateToFormat: string;

        if (dateInput instanceof Date) {
            dateToFormat = dateInput.toISOString();
        } else {
            dateToFormat = dateInput;
        }

        return dateToFormat.includes('T') || dateToFormat.includes(':')
            ? this.formatDateTime(dateToFormat)
            : this.formatDateOnly(dateToFormat);
    }
}

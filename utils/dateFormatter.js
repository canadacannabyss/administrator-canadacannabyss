class Formatter {
  parseDate(input) {
    this.parts = input.match(/(\d+)/g);
    return new Date(this.parts[0], this.parts[1] - 1, this.parts[2]);
  }

  formatDateFullDate(uploadedOn) {
    this.dateFormatted = this.parseDate(uploadedOn);
    this.months = [
      'January',
      'February',
      'March',
      'April',
      'may',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    return `${
      this.months[this.dateFormatted.getMonth()]
    } ${this.dateFormatted.getDate()}, ${this.dateFormatted.getFullYear()}`;
  }

  formatDateMonthOnly(uploadedOn) {
    this.dateFormatted = this.parseDate(uploadedOn);
    this.months = [
      'January',
      'February',
      'March',
      'April',
      'may',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    return `${this.months[this.dateFormatted.getMonth()]} ${this.dateFormatted.getFullYear()}`;
  }
}

export default Formatter;

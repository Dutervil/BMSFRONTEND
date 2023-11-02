import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number, decimalSeparator:number): string {
    // Ensure that value is a number and not NaN or undefined
    if (isNaN(value) || value === undefined) {
      return '0.00';
    }

    // Format the number with exactly two decimal places
    const formattedValue = value.toFixed(decimalSeparator);

    // Split the formatted value into its integer and decimal parts
    const parts = formattedValue.split('.');

    // Add thousands separators (commas) to the integer part
    const integerPartWithCommas = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combine the integer part with commas and the decimal part with a period
    const result = integerPartWithCommas + '.' + parts[1];

    return result || '0.00'; // If integerPartWi
  }
}

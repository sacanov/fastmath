export class Fraction {
  dividend: number;
  divisor: number;

  constructor(dividend: number, divisor: number) {
    this.dividend = dividend;
    this.divisor = divisor;
  }

  gcd(n1: number, n2: number): number {
    if (n2 === 0) {
      return n1;
    } else {
      return this.gcd(n2, n1 % n2);
    }
  }

  toIrreducible() {
    const gcd = this.gcd(this.dividend, this.divisor);

    return new Fraction(this.dividend / gcd, this.divisor / gcd);
  }
}

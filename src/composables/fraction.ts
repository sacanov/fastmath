export class Fraction {
  dividend: number;
  divisor: number;

  constructor(dividend: number, divisor: number) {
    this.dividend = dividend;
    this.divisor = divisor;
  }

  static gcd(n1: number, n2: number): number {
    if (n2 === 0) {
      return n1;
    } else {
      return this.gcd(n2, n1 % n2);
    }
  }

  toIrreducible() {
    const gcd = Fraction.gcd(Math.abs(this.dividend), this.divisor);

    return new Fraction(this.dividend / gcd, this.divisor / gcd);
  }

  static fromString(str: string): Fraction {
    const fracList = str.split("/");
    if (fracList.length > 1) {
      return new Fraction(Number(fracList[0]), Number(fracList[1]));
    }
    return new Fraction(Number(str), 1);
  }
}

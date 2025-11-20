import { expect, test } from 'vitest'
import {
    operations,
    calculation,
} from './js.js'

test('adds 1 + 2 to equal 3', () => {
  expect(operations["+"](1, 2)).toBe(3)
})

test('subtracts 2 from 1 to equal -1', () => {
  expect(operations["-"](1, 2)).toBe(-1)
})

test('multiplies 2 * 3 to equal 6', () => {
    expect(operations["*"](2,3)).toBe(6)
})

test('divides 1/2 to equal .5', () => {
    expect(operations["/"](1,2)).toBe(0.5)
})

test('returns ERRROR for invalid operations', () => {
    expect(calculation(1, "e", 2)).toBe("ERROR!");
})
test('calculation returns correct', () => {
    expect(calculation(1, "+", 2)).toBe(3);
    expect(calculation(3, "*", -4)).toBe(-12);
    expect(calculation(4, "/", 2)).toBe(2);
    expect(calculation(1, "-", 3)).toBe(-2);
})

test.skip('operator methods work', () => {
    expect(operator.operations["+"](2,2)).toBe(4)
})

import { expect, test } from 'vitest'
import {
    sum,
    sub,
    product,
    divide,
} from './js.js'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

test('subtracts 2 from 1 to equal -1', () => {
  expect(sub(1, 2)).toBe(-1)
})

test('multiplies 2 * 3 to equal 6', () => {
    expect(product(2,3)).toBe(6)
})

test('divides 1/2 to equal .5', () => {
    expect(divide(1,2)).toBe(0.5)
})

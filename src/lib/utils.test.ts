import { expect, test } from 'vitest'
import { cn } from './utils'

test('cn merges tailwind classes correctly', () => {
  expect(cn('px-2', 'py-2')).toBe('px-2 py-2')
  expect(cn('px-2', 'px-4')).toBe('px-4')
  expect(cn('text-red-500', {'bg-blue-500': true})).toBe('text-red-500 bg-blue-500')
  expect(cn('text-red-500', {'bg-blue-500': false})).toBe('text-red-500')
})

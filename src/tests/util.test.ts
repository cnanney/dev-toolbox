import { mergeOverlappingRanges } from '$lib/util'
import { compileSearchTokens, findTokenMatches } from '$lib/util/emoji'
import { describe, expect, it } from 'vitest'

describe('emoji util test', () => {
  it('creates search tokens', () => {
    expect(compileSearchTokens('joy   "cat " ^grin|at$')).toEqual([
      'joy',
      'cat ',
      '^grin',
      'at$',
    ])
    expect(compileSearchTokens('!"! arrow"')).toEqual([])
    expect(compileSearchTokens('"! arrow"')).toEqual(['! arrow'])
    expect(compileSearchTokens('=the')).toEqual(['the'])
    expect(compileSearchTokens('!^the')).toEqual([])
    expect(compileSearchTokens('^"!the "')).toEqual(['^!the '])
    expect(compileSearchTokens('\'"red hair"')).toEqual(['red hair'])
    expect(compileSearchTokens('="red hair"')).toEqual(['red hair'])
    expect(compileSearchTokens('!"red hair"')).toEqual([])
  })

  it('finds search token matches', () => {
    const s = 'the cat'
    expect(findTokenMatches(s, compileSearchTokens('^th'))).toEqual([[0, 1]])
    expect(findTokenMatches(s, compileSearchTokens('the'))).toEqual([[0, 2]])
    expect(findTokenMatches(s, compileSearchTokens('!the'))).toEqual([])
    expect(findTokenMatches(s, compileSearchTokens('!^the'))).toEqual([])
    expect(findTokenMatches(s, compileSearchTokens('=the'))).toEqual([[0, 2]])
    expect(findTokenMatches(s, compileSearchTokens("'the"))).toEqual([[0, 2]])
    expect(findTokenMatches(s, compileSearchTokens('at$'))).toEqual([[5, 6]])
    expect(findTokenMatches(s, compileSearchTokens('!at$'))).toEqual([])
    expect(findTokenMatches(s, compileSearchTokens('cat'))).toEqual([[4, 6]])
    expect(findTokenMatches(s, compileSearchTokens('"e c"'))).toEqual([[2, 4]])
    expect(findTokenMatches(s, compileSearchTokens('e c'))).toEqual([
      [2, 2],
      [4, 4],
    ])
    // Dupes are expected here, filtered out elsewhere
    expect(findTokenMatches(s, compileSearchTokens('^th th'))).toEqual([
      [0, 1],
      [0, 1],
    ])
    expect(findTokenMatches('ON! arrow', compileSearchTokens('!'))).toEqual([
      [2, 2],
    ])
    expect(findTokenMatches('ON! arrow', compileSearchTokens('"! a"'))).toEqual(
      [[2, 4]]
    )
  })
})

describe('general util tests', () => {
  it('tests mergeOverlappingRanges', () => {
    expect(
      mergeOverlappingRanges([
        [1, 3],
        [2, 5],
        [7, 9],
      ])
    ).toEqual([
      [1, 5],
      [7, 9],
    ])
    expect(
      mergeOverlappingRanges([
        [1, 3],
        [7, 9],
        [2, 5],
        [3, 4],
      ])
    ).toEqual([
      [1, 5],
      [7, 9],
    ])
  })
})

import { compileSearchTokens, findTokenMatches } from '$lib/util/emoji'
import { describe, expect, it } from 'vitest'

describe('emoji util test', () => {

    it('creates search tokens', () => {
        expect(compileSearchTokens('joy   "cat " ^grin|at$'))
            .toMatchObject(['joy', 'cat ', '^grin', 'at$'])
        expect(compileSearchTokens('!"! arrow"')).toMatchObject([])
        expect(compileSearchTokens('"! arrow"')).toMatchObject(['! arrow'])
        expect(compileSearchTokens('=the')).toMatchObject(['the'])
        expect(compileSearchTokens('!^the')).toMatchObject([])
        expect(compileSearchTokens('^"!the "')).toMatchObject(['^!the '])
    })

    it('finds search token matches', () => {
        const s = 'the cat'
        expect(findTokenMatches(s, compileSearchTokens('^th'))).toMatchObject([[0, 1]])
        expect(findTokenMatches(s, compileSearchTokens('the'))).toMatchObject([[0, 2]])
        expect(findTokenMatches(s, compileSearchTokens('!the'))).toMatchObject([])
        expect(findTokenMatches(s, compileSearchTokens('!^the'))).toMatchObject([])
        expect(findTokenMatches(s, compileSearchTokens('=the'))).toMatchObject([[0, 2]])
        expect(findTokenMatches(s, compileSearchTokens('\'the'))).toMatchObject([[0, 2]])
        expect(findTokenMatches(s, compileSearchTokens('at$'))).toMatchObject([[5, 6]])
        expect(findTokenMatches(s, compileSearchTokens('!at$'))).toMatchObject([])
        expect(findTokenMatches(s, compileSearchTokens('cat'))).toMatchObject([[4, 6]])
        expect(findTokenMatches(s, compileSearchTokens('"e c"'))).toMatchObject([[2, 4]])
        expect(findTokenMatches(s, compileSearchTokens('e c'))).toMatchObject([[2, 2], [4, 4]])
        // Dupes are expected here, filtered out elsewhere
        expect(findTokenMatches(s, compileSearchTokens('^th th'))).toMatchObject([[0, 1], [0, 1]])
        expect(findTokenMatches('ON! arrow', compileSearchTokens('!'))).toMatchObject([[2,2]])
        expect(findTokenMatches('ON! arrow', compileSearchTokens('"! a"'))).toMatchObject([[2,4]])
        expect(findTokenMatches('ON! arrow', compileSearchTokens('"! a"'))).toMatchObject([[2,4]])
    })

})

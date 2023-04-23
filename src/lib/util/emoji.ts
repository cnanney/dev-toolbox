import type { Emoji, RangeIndices } from '$lib/types'
import { urlTo } from '$lib/util'

export const emojiPngFileName = function (emoji: Emoji) {
    const codes = emoji.qc ?? []

    return (
        codes.length === 2 && codes.slice(-1)[0] === 'fe0f'
            ? codes.slice(0, -1)
            : codes
    ).join('_')
}

export const emojiDisplayHtmlChars = (emoji: Emoji) => {
    return emoji.qc.map((c) => {
        let meta: { [k: string]: { class: string, title: string } } = {
            '200d': {
                class: 'control zwj',
                title: 'Zero Width Joiner',
            },
            '200e': {
                class: 'control zwnj',
                title: 'Zero Width Non-Joiner',
            },
            'fe0f': {
                class: 'control dai',
                title: 'Emoji Variation Selector',
            },
            'fe0e': {
                class: 'control zwj',
                title: 'Text Variation Selector',
            },
        }

        let title = meta[c]?.title ? `title="${meta[c].title}"` : ''
        let char = 'U+' + c.toUpperCase()

        return `<span class="e-byte ${meta[c]?.class || ''}" ${title}>${char}</span>`
    }).join('')
}

export const emojiPngPath = (emoji: Emoji) => urlTo(`/emoji-png/${emojiPngFileName(emoji)}.png`)
export const emojiGhCodes = (emoji: Emoji) => emoji.gh.map(name => `:${name}:`).join('\n')
export const emojiHtmlChars = (emoji: Emoji) => emoji.qc.map((c) => `&#x${c};`).join('')

export function compileSearchTokens(searchInput: string) {
    const RE_NEGATION = /^!/
    const RE_REMOVE = /[^a-z0-9^! $:-]/g

    return searchInput
        .toLowerCase()
        // Capture parenthesis groups, split on `spaces` (AND), and `|` (OR)
        .split(/([!^=]*?".+"[$]?)|\s+|\|/g)
        // Clean (must be first)
        .filter(s => {
            // Remove blank and undefined
            if (!s) return false
            // Remove negated text, but keep single char
            if (RE_NEGATION.test(s)) return s.length === 1

            return true
        })
        // Remove unneeded chars
        .map(s => s ? s.replace(RE_REMOVE, '') : '')
        // Check for blank again
        .filter(s => s.length)
}

export function findTokenMatches(input: string, tokens: string[]) {
    let indices: RangeIndices = [], match

    tokens.forEach(token => {
        if (!token) return

        const tokenRE = new RegExp(token, 'g')
        while (match = tokenRE.exec(input)) {
            indices.push([match.index, tokenRE.lastIndex - 1])
        }
    })

    return indices
}

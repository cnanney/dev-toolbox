import md5 from 'crypto-js/md5'
import ripemd160 from 'crypto-js/ripemd160'
import sha1 from 'crypto-js/sha1'
import sha256 from 'crypto-js/sha256'
import sha512 from 'crypto-js/sha512'
import sha3 from 'crypto-js/sha3'

type HashInput = string

export const hash = {
    md5: (input: HashInput) => md5(input),
    ripemd160: (input: HashInput) => ripemd160(input),
    sha1: (input: HashInput) => sha1(input),
    sha256: (input: HashInput) => sha256(input),
    sha512: (input: HashInput) => sha512(input),
    sha3_256: (input: HashInput) => sha3(input, {outputLength: 256}),
    sha3_512: (input: HashInput) => sha3(input, {outputLength: 512}),
}

export const runCalc = (fn: (input: any) => string, value: any): string => {
    if (!value) return ''

    try {
        return fn(value)
    } catch (e) {
        return ''
    }
}

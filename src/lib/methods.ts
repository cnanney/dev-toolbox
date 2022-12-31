import md5 from 'crypto-js/md5'
import ripemd160 from 'crypto-js/ripemd160'
import sha1 from 'crypto-js/sha1'
import sha256 from 'crypto-js/sha256'
import sha512 from 'crypto-js/sha512'
import sha3 from 'crypto-js/sha3'
import {escape, unescape} from 'lodash-es'
import type {DecodeInput, EncodeInput, HashInput, NumberInput} from '$lib/types'
import {b64, toBase} from '$lib/util'

export const hash = {
    md5: (input: HashInput) => md5(input).toString(),
    ripemd160: (input: HashInput) => ripemd160(input).toString(),
    sha1: (input: HashInput) => sha1(input).toString(),
    sha256: (input: HashInput) => sha256(input).toString(),
    sha512: (input: HashInput) => sha512(input).toString(),
    sha3_256: (input: HashInput) => sha3(input, {outputLength: 256}).toString(),
    sha3_512: (input: HashInput) => sha3(input, {outputLength: 512}).toString(),
}

export const encode = {
    uri: (input: EncodeInput) => encodeURIComponent(input),
    html: (input: EncodeInput) => escape(input),
    base64: (input: EncodeInput) => b64(input, 'encode'),
}

export const decode = {
    uri: (input: DecodeInput) => decodeURIComponent(input),
    html: (input: DecodeInput) => unescape(input),
    base64: (input: DecodeInput) => b64(input, 'decode'),
}

export const number = {
    bin: (input: NumberInput) => toBase(input, 2),
    oct: (input: NumberInput) => toBase(input, 8),
    dec: (input: NumberInput) => toBase(input, 10),
    hex: (input: NumberInput) => toBase(input, 16),
}


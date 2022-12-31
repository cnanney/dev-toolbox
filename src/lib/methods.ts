import md5 from 'crypto-js/md5'
import ripemd160 from 'crypto-js/ripemd160'
import sha1 from 'crypto-js/sha1'
import sha256 from 'crypto-js/sha256'
import sha512 from 'crypto-js/sha512'
import sha3 from 'crypto-js/sha3'
import {escape, unescape} from 'lodash-es'
import type {DecodeInput, EncodeInput, HashInput, NetInput, NumberInput, TimeInput} from '$lib/types'
import {b64, toBase} from '$lib/util'
import {DateTime} from 'luxon'

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

export const time = {
    unix_sec: (input: TimeInput) => Math.floor(input?.toSeconds() || 0) || '',
    unix_milli: (input: TimeInput) => input?.toMillis() || '',
    iso: (input: TimeInput) => input?.toISO({suppressMilliseconds: true}) || '',
    iso_date: (input: TimeInput) => input?.toISODate() || '',
    iso_time: (input: TimeInput) => input?.toISOTime({suppressMilliseconds: true}) || '',
    iso_week: (input: TimeInput) => input?.toISOWeekDate() || '',
    sql: (input: TimeInput) => input?.toSQL({includeOffset: false}).replace(/\.000$/, '') || '',
    http: (input: TimeInput) => input?.toHTTP() || '',
    local: (input: TimeInput) => input?.toLocal().toISO({suppressMilliseconds: true}) || '',
    full: (input: TimeInput) => input?.toLocal().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS) || '',
}

export const net = {
    ip_dec: (input: NetInput) => input?.netLong,
    dec_ip: (input: NetInput) => input?.base,
    ip_bin: (input: NetInput) => toBase(String(input?.netLong ?? ''), 2, 32),
    ip_hex: (input: NetInput) => toBase(String(input?.netLong ?? ''), 16),
    net_mask: (input: NetInput) => input?.broadcast ? input.base + '/' + input.mask : '',
    broadcast: (input: NetInput) => input?.broadcast || '',
    hosts: (input: NetInput) => input?.broadcast ? input?.size : '',
    min_host: (input: NetInput) => input?.broadcast ? input?.first : '',
    max_host: (input: NetInput) => input?.broadcast ? input?.last : '',
}

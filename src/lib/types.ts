import type { DateTime } from 'luxon'
import type { Netmask } from 'netmask'

export type HashInput = string
export type EncodeInput = string
export type DecodeInput = string
export type NumberInput = string
export type TimeInput = DateTime | null
export type NetInput = Netmask | null

export type PreCalcCallback = (input: string, type?: string | null) => any

export type CalcResult = {
    title: string,
    size: number,
    method: (input: any) => string,
    send?: boolean,
    sendInputType?: string
}

export type Emoji = {
    qc: string[], // qualified codes
    n: string, // name
    g: number, // group
    sg: number, // sub group
    gh: string[] // github aliases
}

import type { DateTime } from 'luxon'
import type { Netmask } from 'netmask'

export type TKey = string | number | symbol
export type TObject = Record<TKey, any>
export type TNullish = null | undefined;
export type RangeTuple = [number, number]
export type RangeIndices = RangeTuple[]

export type HashInput = string
export type EncodeInput = string
export type DecodeInput = string
export type NumberInput = string
export type TimeInput = DateTime | TNullish
export type NetInput = Netmask | TNullish

export type PreCalcCallbackWithType = (input: string, type: string) => any
export type PreCalcCallbackNoType = (input: string) => any

export type CalcResult = {
    title: string,
    size: number,
    method: (input: any) => any,
    send?: boolean,
    sendInputType?: string
}

export type CalcRow = {
    border?: boolean,
    cols: CalcResult[]
}

export type InputModifier = {
    html: string,
    separator?: string,
    callback?: () => void
}

export type InputOption = {
    text: string,
    value: string,
}

export type InputToggle = {
    text: string,
    checked: boolean,
    callback: () => void
}

export type InputTrigger = {
    html: string,
    title?: string,
    separator?: string,
    callback: () => void
}

export type Emoji = {
    qc: string[], // qualified codes
    n: string, // name
    g: number, // group
    sg: number, // sub group
    gh: string[] // github aliases
    fi?: ReadonlyArray<RangeTuple> // fuse search result indices to highlight
}

export type TimeTypeFromFormats = 'fromSeconds' | 'fromMillis' | 'fromISO' | 'fromSQL' | 'fromHTTP'
export type TimeTypeToFormats = 'toSeconds' | 'toMillis' | 'toISO' | 'toSQL' | 'toHTTP'

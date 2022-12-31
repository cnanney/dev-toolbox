export type HashInput = string
export type EncodeInput = string
export type DecodeInput = string
export type NumberInput = string

export type PreCalcCallback = (input: any, type: string | null) => any

export type CalcResult = {
    title: string,
    size: number,
    method: (input: any) => string,
    send?: boolean,
    sendInputType?: string
}

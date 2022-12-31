export type HashInput = string
export type EncodeInput = string
export type DecodeInput = string
export type NumberInput = string

export type PreCalcInput = (input: any, type: string | null = null) => any

export type CalcResult = {
    title: string,
    size: number,
    method: (input: any) => string,
    send?: boolean,
    sendInputType?: string
}

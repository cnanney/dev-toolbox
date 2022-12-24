export type HashInput = string
export type EncodeInput = string

export type CalcResult = {
    title: string,
    size: number,
    method: (input: any) => string,
    send?: boolean,
    sendInputType?: string
}

import type { ISlider, ISliderForm } from 'types'

export type MsgResult = { msg: string }
export type IdQuery = { id: string }
export type GetSingleSliderResult = ISlider
export type GetSlidersResult = ISlider[]
export type GetSlidersQuery = { category: string }
export type UpdateSliderQuery = { id: string; body: Partial<ISlider> }
export type CreateSliderQuery = { body: ISliderForm }

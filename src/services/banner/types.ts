import type { IBanner, IBannerForm } from 'types'

export type MsgResult = { msg: string }
export type IdQuery = { id: string }
export type GetBannersQuery = { category: string }
export type GetBannersResult = IBanner[]
export type GetSingleBannerResult = IBanner
export type UpdateBannerQuery = { id: string; body: IBanner }
export type CreateBannerQuery = { body: IBannerForm }

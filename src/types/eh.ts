export enum EhTag {
  'dou' = 'Doujinshi',
  'man' = 'Manga',
  'acg' = 'Artist CG',
  'gcg' = 'Gama CG',
  'wes' = 'Western',
  'noh' = 'Non-H',
  'img' = 'Image Set',
  'cos' = 'Cosplay',
  'asi' = 'Asian Porn',
  'misc' = 'Misc'
}

export type EhTitle = {
  link: string,
  title: string,
  tags: string[]
}

export type EhPublished = {
  imgSrc: string,
  download: string,
  time: number,
  mark: number,
  id: number
}

export type EhUploader = {
  up: string,
  pages: number
}

export type EhItem = {
  tag: EhTag,
  published: EhPublished,
  title: EhTitle,
  uploader: EhUploader,
  getTime: number
}

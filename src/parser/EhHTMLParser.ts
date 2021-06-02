import {EhTag, EhPublished, EhTitle, EhItem, EhUploader} from '../types/eh'
import { Parser, CE } from '../types/Parser'

export class EhHTMLParser extends Parser<EhItem[]>{
  private parseTitle(td: CE): EhTitle {
    const { attr, text, $ } = this.createUtilApi(td)

    return {
      link: attr('a', 'href'),
      title: text('.glink'),
      tags: $('.gt', td)
        .map((i, el) => $(el).text())
        .get()
    }
  }

  private parsePublished(td: CE): EhPublished {
    const { attr, text } = this.createUtilApi(td)
    const id: number = +attr('.glcut', 'id').slice(2)

    const result: EhPublished = {
      imgSrc: attr('.glthumb img', 'data-src'),
      download: attr('.gldown a', 'href'),
      time: new Date(text(`#posted_${id}`)).getTime(),
      mark: mark(attr('.ir', 'style')),
      id
    }

    return result
  }

  private parseUploader(td: CE): EhUploader {
    return {
      up: this.$('a', td).text(),
      pages: 0
    }
  }

  parse() {
    const { $ } = this

    return $('tr').map((i, el): EhItem => {
      const tag: string = $('.gl1c>.cn', el).text()

      return tag.length !== 0 ? ({
        tag: tag as EhTag,
        published: this.parsePublished($('.gl2c', el)),
        title: this.parseTitle($('.gl3c', el)),
        uploader: this.parseUploader($('.gl4c', el)),
        getTime: Date.now()
      }) : null
    }).get()
  }
}

function mark(style: string): number {
  if (!style) return undefined

  const result: ({ [k: string]: string }) = Object.create(null)
  style.split(';').forEach(value => {
    const [k, v] = value.split(':')
    result[k] = v
  })
  const m = result['background-position']
  return m && (5 + (parseInt(m.split(' ')[0]) / 16))
}

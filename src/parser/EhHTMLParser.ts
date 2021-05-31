import { load } from 'cheerio'
import {EhTag, EhPublished, EhTitle, EhItem, EhUploader} from '../types/eh'


function mark(style: string): number {
  if (!style) return undefined

  const result: ({[k: string]: string}) = Object.create(null)
  style.split(';').forEach(value => {
    const [k, v] = value.split(':')
    result[k] = v
  })
  const m = result['background-position']
  return  m && (5 + (parseInt(m.split(' ')[0]) / 16))
}

export function parseEhPopularPage(html: string): EhItem[] {
  const $ = load(html)

  function parseTitle(td): EhTitle {
    return {
      link: $('a', td).attr('href'),
      title: $('.glink', td).text(),
      tags: $('.gt', td).map(function () {
        return $(this).text()
      }).get()
    }
  }

  function parsePublished(td): EhPublished {
    return {
      imgSrc: $('.glthumb img', td).attr('data-src'),
      download: $('.gldown a', td).attr('href'),
      time: new Date($('.cn.cta+div', td).text()).getTime(),
      mark: mark($('.ir', td).attr('style')),
      id: +($('.glcut', td).attr('id').slice(2))
    }
  }

  function parseUploader(tr): EhUploader {
    return {
      up: $('.gl4c a', tr).text(),
      pages: 0
    }
  }

  return $('tr')
    .map((i, el): EhItem => {
      const tag: string = $('td.gl1c>.cn', el).text()

      return tag.length !== 0 ? ({
        tag: tag as EhTag,
        published: parsePublished($('td.gl2c', el)),
        title: parseTitle($('td.gl3c', el)),
        uploader: parseUploader(el),
        getTime: Date.now()
      }) : null
    })
    .get()
}

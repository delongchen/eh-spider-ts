import {load, CheerioAPI, Element, Cheerio} from 'cheerio'

export type CE = Cheerio<Element>

type ParseUtil = {
  text: (selector: string) => string
  attr: (selector: string, attr: string) => string
  $: CheerioAPI
}

export class Parser<T> {
  $: CheerioAPI

  constructor(html: string) {
    this.$ = load(html)
  }

  parse(): T {
    return null
  }

  text(el: CE, selector: string): string {
    return this.$(selector, el).text()
  }

  attr(el: CE, selector: string, attr: string): string {
    return this.$(selector, el).attr(attr)
  }

  createUtilApi(el: CE): ParseUtil {
    return {
      text: (selector: string) => this.text(el, selector),
      attr: (selector: string, attr: string) => this.attr(el, selector, attr),
      $: this.$
    }
  }
}

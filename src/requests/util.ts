import fetch, {
  Headers,
  RequestInit,
} from "node-fetch"

const headers = new Headers()

const reqOpt: RequestInit = {
  headers
}

export function getEhPopularPage(): Promise<string> {
  return fetch('https://e-hentai.org/popular', reqOpt)
    .then(res => res.text())
}

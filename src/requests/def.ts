import {Headers, RequestInit} from "node-fetch";

const defHeaders = new Headers

defHeaders.append('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 Edg/91.0.864.37')
defHeaders.append('Referer', 'https://e-hentai.org')
defHeaders.append('Cookie', 'ipb_member_id=5596027; ipb_pass_hash=47b25eeb55c6421e9203497308a3722e; sk=ntntqc9hn5w7ye08haa2r1fvfwhk; cf_clearance=ef36b8dcfac9924c4c173083b4b5135bc3136d01-1622544482-0-150; event=1622555909')
defHeaders.append('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9')
defHeaders.append('Accept-Encoding', 'gzip, deflate, br')
defHeaders.append('Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6')

const defReqOpt: RequestInit = {
  headers: defHeaders,
  timeout: 10000
}

export {
  defHeaders,
  defReqOpt
}

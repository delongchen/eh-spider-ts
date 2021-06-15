const m = new Map

const mp = new Proxy(m, {
  get(target, p, receiver) {
    console.log(p)
    return Reflect.get(target, p, receiver).bind(target)
  }
})

mp.set('1', '2')
mp.set('1', '2')
mp.get('1')
mp.set('1', '2')
mp.delete('1')
mp.set('1', '2')
mp.set('1', '2')
mp.set('1', '2')

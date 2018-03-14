export { getBinary, getJson }

function getBinary(url: string) {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest()
        req.onload = (ev: Event) => {
            if (req.status == 200) {
                var buffer = new Int32Array(req.response)
                resolve(buffer)
            } else {
                reject('Error fetching: ' + url)
            }
        }
        req.open('GET', url, true)
        req.responseType = 'arraybuffer'
        req.send()
    })
}

function getJson(url: string) {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest()
        req.onload = (ev: Event) => {
            if (req.status == 200) {
                resolve(req.response)
            } else {
                reject('Error fetching: ' + url)
            }
        }
        req.open('GET', url, true)
        req.responseType = 'json'
        req.send()
    })
}

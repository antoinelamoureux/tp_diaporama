export function ajaxGet(uri) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()

        xhr.open("GET", uri)
        xhr.send()

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let data = xhr.responseXML
                resolve(data)
            } else {
                console.log(xhr.status)
            }
        }
    })
}
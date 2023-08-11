export const isValidUpi = (upi) => {
    let result = /^[\w.-]+@[\w.-]+$/.test(upi);
    return result
}

export const isValidIfsc = (ifsc) => {
    let result =/^[A-Za-z]{4}[a-zA-Z0-9]{7}$/.test(ifsc);
    return result
}
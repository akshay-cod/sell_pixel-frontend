export const isValidUpi = (upi) => {
    let result = /^[\w.-]+@[\w.-]+$/.test(upi);
    return result
}

export const isValidIfsc = (ifsc) => {
    let result =/^[A-Za-z]{4}[a-zA-Z0-9]{7}$/.test(ifsc);
    return result
}

export const isValidEmail = (email) => {
    let result =/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
    return result
}
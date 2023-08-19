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

export const isnoSpecialCharAndSpace = (input) => {
    // Regular expression to match only alphanumeric characters (no special characters) and no spaces
    const regex = /^[a-zA-Z0-9]*$/.test(input);
  
    return regex;
  }

  export const ensureHttps =(url) => {
    // Check if the URL starts with "http://"
    if (url.startsWith("http://")) {
      // Replace "http://" with "https://"
      return url.replace("http://", "https://");
    } else if (!url.startsWith("https://")) {
      // If it doesn't start with either "http://" or "https://", assume HTTPS
      return "https://" + url;
    }
    // If it already starts with "https://", no changes needed
    return url;
  }
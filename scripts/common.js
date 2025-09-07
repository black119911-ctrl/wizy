const requestUrl = 'https://ckk04414-7259.euw.devtunnels.ms/api/TestUsers/'

function writeCookie(tokenKey, expirationDate) {
    const dateObj = new Date(expirationDate)
    const expiresStr = dateObj.toUTCString()
    // document.cookie = `authToken=${tokenKey}; Expires=${expiresStr}; Path=/; HttpOnly; Secure; SameSite=Lax`;
    document.cookie = `authToken=${tokenKey}; Expires=${expiresStr} Secure;`;
}

function getCookie(name) {
    const matches = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return matches ? decodeURIComponent(matches[2]) : undefined;
}
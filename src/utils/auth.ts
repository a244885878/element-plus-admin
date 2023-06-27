import Cookies from 'js-cookie'

export const TokenKey = 'access_token'

export function getToken() {
	return Cookies.get(TokenKey)
}

export function setToken(token: string, overdueDay = 1) {
	return Cookies.set(TokenKey, token, { expires: overdueDay })
}

export function removeToken() {
	return Cookies.remove(TokenKey)
}

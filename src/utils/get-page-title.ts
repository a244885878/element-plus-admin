import defaultSettings from '@/settings'

const title = defaultSettings.title || 'element-plus-admin'

export default function getPageTitle(pageTitle: string) {
	if (pageTitle) {
		return `${pageTitle} - ${title}`
	}
	return `${title}`
}

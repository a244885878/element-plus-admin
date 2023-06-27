/**
 * @description: 工具方法
 */

/**
 * @description:随机函数
 * @param min {number} 最小值
 * @param max {number} 最大值
 * @return value {number} 返回的随机值
 */
export const random = (min: number, max: number): number => {
	const result = Math.random() * (max - min + 1) + min
	return parseInt(String(result))
}

/**
 * @description:节流函数
 * @param fn {function} 回调函数
 * @param delay {number} 延迟时间
 */
export const throttle = (fn: any, delay: number) => {
	let flag = true
	return () => {
		if (!flag) return
		flag = false
		fn()
		const timer = setTimeout(() => {
			flag = true
			clearTimeout(timer)
		}, delay)
	}
}

/**
 * @description:防抖函数
 * @param fn {function} 回调函数
 * @param delay {number} 延迟时间
 */
export const debounce = (fn: any, delay: number) => {
	let timer: any = null
	return () => {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			fn()
		}, delay)
	}
}

/**
 * @description:切割数组
 * @param arr {Array} 传入的数组
 * @param chunkSize {number} 切割的数量
 */
export const splitArray = (arr: any, chunkSize: number) => {
	const newArr = []
	for (let i = 0; i < arr.length; i += chunkSize) {
		newArr.push(arr.slice(i, i + chunkSize))
	}
	return newArr
}

/**
 * @description:全局popper-style样式
 */
export const popperStyle = {
	width: 'auto',
	padding: '0px',
}

/**
 * @description:下载图片方法
 * @param src {string} 下载路径
 * @param name {any} 文件名
 */
export const downloadImage = (src: any, name: any, type: string) => {
	const image = new Image()
	image.setAttribute('crossOrigin', 'anonymous')
	image.onload = function () {
		const canvas = document.createElement('canvas')
		canvas.width = image.width
		canvas.height = image.height
		const context: any = canvas.getContext('2d')
		context.drawImage(image, 0, 0, image.width, image.height)
		const url = canvas.toDataURL(`image/${type}`)
		const a = document.createElement('a')
		const event = new MouseEvent('click')
		a.download = name || 'photo'
		a.href = url
		a.dispatchEvent(event)
	}
	image.src = src
}

/**
 * @description:下载文件方法
 * @param url {string} 下载路径
 * @param filename {string} 文件名
 */
export function downloadFile(url: string, filename: string) {
	fetch(url)
		.then((response) => response.blob())
		.then((blob) => {
			const url = window.URL.createObjectURL(new Blob([blob]))
			const a = document.createElement('a')
			a.href = url
			a.download = filename
			a.click()
			window.URL.revokeObjectURL(url)
		})
}

/**
 * @description:金额格式化函数
 * @param n {number} 需要格式化的金额
 * @return n {string} 格式化后的金额
 */
export const formatMoney = (n: number) => {
	return n.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')
}

/**
 * @description:将数字格式化成时间
 * @param sec 传入的数字
 * @returns 返回的时间
 */
export const timeCycleFilter = (sec: number) => {
	let hour: string | number = Math.floor(sec / 3600)
	let minute: string | number = Math.floor((sec - hour * 3600) / 60)
	let second: string | number = sec - hour * 3600 - minute * 60
	if (hour < 10) {
		hour = '0' + hour
	}
	if (minute < 10) {
		minute = '0' + minute
	}
	if (second < 10) {
		second = '0' + String(parseInt(String(second)))
	} else {
		second = String(parseInt(String(second)))
	}
	return hour + ':' + minute + ':' + second
}

/**
 * @param days {number} 获取的天数
 * @returns [startTimeStamp, endTimeStamp] 开始的时间戳，结束的时间戳
 */
export const getTimeRangeLastDays = (days: number) => {
	const now = parseInt(String(Date.now() / 1000))
	const startTimeStamp = parseInt(
		String(((now - days * 24 * 3600) / 86400) * 86400)
	)
	const endTimeStamp = parseInt(String((now / 86400) * 86400 - 1))

	return [startTimeStamp, endTimeStamp]
}

/**
 * @description:将时间戳(秒)格式化成YYYY/MM/DD HH:mm:ss
 * @param timestamp {number} - 传入的时间戳
 * @returns 格式化的时间字符串
 */
export function formatTimeStamp(timestamp: number) {
	const date = new Date(timestamp * 1000)
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	const seconds = String(date.getSeconds()).padStart(2, '0')
	return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
}

/**
 * @description:获取文件后缀
 * @param filename {string} 文件名
 * @returns 文件后缀
 */
export function getFileExtension(filename: string) {
	return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
}

/**
 * @description:字节转换单位方法
 * @param size 字节大小
 * @returns 转换的尺寸
 */
export function sizeToStr(size: number) {
	let data = ''
	if (size < 0.1 * 1024) {
		//如果小于0.1KB转化成B
		data = size.toFixed(2) + 'B'
	} else if (size < 0.1 * 1024 * 1024) {
		//如果小于0.1MB转化成KB
		data = (size / 1024).toFixed(2) + 'KB'
	} else if (size < 0.1 * 1024 * 1024 * 1024) {
		//如果小于0.1GB转化成MB
		data = (size / (1024 * 1024)).toFixed(2) + 'MB'
	} else {
		//其他转化成GB
		data = (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
	}
	const sizestr = data + ''
	const len = sizestr.indexOf('.')
	const dec = sizestr.substr(len + 1, 2)
	if (dec == '00') {
		//当小数点后为00时 去掉小数部分
		return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
	}
	return sizestr
}

/**
 * @description:生成文件缩略图
 * @param file 文件
 * @param thumbnailWidth 输出的宽度
 * @param thumbnailHeight 输出的高度
 * @param callback 回调函数
 */
export function generateThumbnail(
	file: any,
	thumbnailWidth: number,
	thumbnailHeight: number
) {
	return new Promise((resolve) => {
		const reader = new FileReader()
		reader.onload = function (event: any) {
			const img: any = new Image()
			img.onload = function () {
				const canvas = document.createElement('canvas')
				const width = thumbnailWidth * 2
				const height = thumbnailHeight * 2
				canvas.width = width
				canvas.height = height
				const ctx: any = canvas.getContext('2d')
				ctx.drawImage(img, 0, 0, width, height)
				const dataURL = canvas.toDataURL('image/jpeg')
				resolve(dataURL)
			}
			img.src = event.target.result
		}
		reader.readAsDataURL(file)
	})
}

/**
 * @description:输出缩略图尺寸
 * @param width{number} - 原图的宽度
 * @param height{number} - 原图的高度
 * @param calcWidth{number} - 需要换算比例的宽度
 * @return {w:缩略图宽度,h:缩略图高度}
 */
export function setThumbnailSize(
	width: number,
	height: number,
	calcWidth: number
) {
	const radio = width / height
	const h = calcWidth / radio
	return { w: calcWidth, h }
}

/**
 * @description:base64转file
 * @param base64Data
 * @param fileName 文件名
 * @returns 输出的file
 */
export function base64toFile(base64Data: any, fileName: string) {
	const contentType = base64Data.split(';')[0].split(':')[1]
	const binaryData = atob(base64Data.split(',')[1])
	const array = []
	for (let i = 0; i < binaryData.length; i++) {
		array.push(binaryData.charCodeAt(i))
	}
	const blob = new Blob([new Uint8Array(array)], { type: contentType })
	return new File([blob], fileName)
}

/**
 * @description:获取图片尺寸(宽高)
 * @param file
 * @returns {width,height} 图片的宽高
 */
export function getImgSize(file: any) {
	return new Promise((resolve, reject) => {
		const blobUrl = URL.createObjectURL(file)
		const img = new Image()
		img.src = blobUrl
		img.onload = function () {
			resolve({
				width: (this as any).width,
				height: (this as any).height,
			})
		}
		img.onerror = function (err) {
			reject(err)
		}
	})
}

/**
 * @description:获取视频尺寸(宽高)和缩略图
 * @param file
 * @returns {width,height,dataURL} 视频的宽高,缩略图base64
 */
export function getVideoSize(file: any) {
	return new Promise((resolve) => {
		const blobUrl = URL.createObjectURL(file)
		const videoElement = document.createElement('video')
		videoElement.setAttribute('src', blobUrl)
		videoElement.setAttribute('crossOrigin', 'anonymous') //处理跨域
		videoElement.setAttribute('preload', 'auto')
		videoElement.addEventListener('loadeddata', async function () {
			const canvas = document.createElement('canvas')
			canvas.width = this.videoWidth * 2
			canvas.height = this.videoHeight * 2
			const ctx: any = canvas.getContext('2d')
			ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height)
			const dataUrl = canvas.toDataURL('image/jpeg')
			resolve({
				width: this.videoWidth,
				height: this.videoHeight,
				dataUrl,
			})
		})
	})
}

/**
 * @description:将file转成base64
 * @param file
 * @returns 转换的base64
 */
export function fileToBase64(file: any) {
	return new Promise((resolve) => {
		// 创建FileReader对象
		const reader = new FileReader()
		// 设置读取完成后的回调函数
		reader.onload = function (event: any) {
			// 在回调函数中获取Base64编码的字符串
			const base64String = event.target.result
			resolve(base64String)
		}
		// 将文件读取为Data URL格式的字符串
		reader.readAsDataURL(file)
	})
}

/**
 * @description:获取音频文件的时长
 * @param url
 * @returns 解析的时长
 */
export function getAudioDuration(url: any) {
	return new Promise((resolve) => {
		const audio = new Audio()
		audio.src = url
		audio.addEventListener('loadedmetadata', () => {
			// 获取音频文件的时长
			const duration = timeCycleFilter(audio.duration)
			resolve(duration)
		})
	})
}

/**
 * @description:获取文件名,不包含后缀
 * @param filename 传入的文件名
 * @returns 返回最后一个点之前的所有字符作为文件名
 */
export function getFileNameWithoutExtension(filename: string) {
	// 获取最后一个点的位置
	const dotIndex = filename.lastIndexOf('.')

	// 如果没有点则返回完整文件名
	if (dotIndex === -1) {
		return filename
	}

	// 返回最后一个点之前的所有字符作为文件名
	return filename.substring(0, dotIndex)
}

/**
 * @description:获取文件的content-type
 * @param fileName{string} - 传入的文件名
 * @returns fileType{string} - 对应的content-type
 */
export function getFileType(fileName: string) {
	const fileTypeRegex = /(?:\.([^.]+))?$/
	const match = fileTypeRegex.exec(fileName)
	const extension = match && match[1]
	let fileType = ''
	switch (extension?.toLowerCase()) {
		case 'txt':
			fileType = 'text/plain'
			break
		case 'html':
		case 'htm':
			fileType = 'text/html'
			break
		case 'xml':
			fileType = 'application/xml'
			break
		case 'json':
			fileType = 'application/json'
			break
		case 'jpg':
		case 'jpeg':
			fileType = 'image/jpeg'
			break
		case 'png':
			fileType = 'image/png'
			break
		case 'gif':
			fileType = 'image/gif'
			break
		case 'bmp':
			fileType = 'image/bmp'
			break
		case 'mp4':
			fileType = 'video/mp4'
			break
		case 'mov':
			fileType = 'video/quicktime'
			break
		case 'wmv':
			fileType = 'video/x-ms-wmv'
			break
		case 'flv':
			fileType = 'video/x-flv'
			break
		case 'mp3':
			fileType = 'audio/mpeg'
			break
		case 'wav':
			fileType = 'audio/wav'
			break
		case 'ogg':
			fileType = 'audio/ogg'
			break
		case 'aac':
			fileType = 'audio/aac'
			break
		case 'pdf':
			fileType = 'application/pdf'
			break
		case 'doc':
			fileType = 'application/msword'
			break
		case 'xls':
			fileType = 'application/vnd.ms-excel'
			break
		case 'ppt':
			fileType = 'application/vnd.ms-powerpoint'
			break
		default:
			fileType = ''
			break
	}
	return fileType
}

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export const init = async (loading: any): Promise<void> => {
	const scene = new THREE.Scene()

	const threeRenderBox: any = document.querySelector('#three-render-box')

	const camera = new THREE.PerspectiveCamera(
		75,
		threeRenderBox.offsetWidth / threeRenderBox.offsetHeight,
		0.1,
		1000
	)

	camera.position.set(0, 0, 10)
	scene.add(camera)

	// 初始化渲染器
	const renderer = new THREE.WebGLRenderer({
		// 增加下面这个属性，可以抗锯齿
		antialias: true,
	})
	// 设置渲染器的尺寸大小
	renderer.setSize(threeRenderBox.offsetWidth, threeRenderBox.offsetHeight)
	renderer.setClearColor('#000', 1) //设置背景颜色
	threeRenderBox.appendChild(renderer.domElement)

	// 加载模型
	const gltfLoader = new GLTFLoader()
	const dracoLoader = new DRACOLoader()
	dracoLoader.setDecoderPath('draco/') // 设置DRACO解码器的路径
	gltfLoader.setDRACOLoader(dracoLoader)
	const gltf = await gltfLoader.loadAsync('models/LittlestTokyo.glb')

	const model = gltf.scene
	scene.add(model)
	model.scale.setScalar(0.016)

	// 创建动画混合器
	const mixer = new THREE.AnimationMixer(model)
	const action = mixer.clipAction(gltf.animations[0])
	action.setLoop(THREE.LoopRepeat, Infinity) //设置循环播放，
	action.play()

	// 点光源
	const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
	directionalLight.position.set(1, 1, 1)
	scene.add(directionalLight)

	// 添加环境光
	const color = 0xffffff
	const intensity = 1
	const light = new THREE.AmbientLight(color, intensity)
	scene.add(light)
	loading.value = false

	// 创建轨道控制器
	const controls = new OrbitControls(camera, renderer.domElement)
	// 开启阻尼效果
	controls.enableDamping = true
	// 该对象用于跟踪时间
	const clock = new THREE.Clock()

	const render = () => {
		// 使用渲染器，通过相机将场景渲染进来
		renderer.render(scene, camera)
		controls.update()
		// 获取自 .oldTime 设置后到当前的秒数
		const time = clock.getDelta()
		// 推进混合器时间并更新动画
		mixer.update(time)
		model.rotation.y += 0.0015
		// 请求动画帧
		requestAnimationFrame(render)
	}

	const renderFn = () => {
		renderer.setSize(
			threeRenderBox.offsetWidth,
			threeRenderBox.offsetHeight
		)
		renderer.setPixelRatio(window.devicePixelRatio)
		camera.aspect = threeRenderBox.offsetWidth / threeRenderBox.offsetHeight
		camera.updateProjectionMatrix()
	}

	renderFn()

	window.onresize = () => {
		renderFn()
	}

	// 5秒后暂停播放
	// setTimeout(() => {
	//   action.paused = true
	// }, 5000)

	render()
}

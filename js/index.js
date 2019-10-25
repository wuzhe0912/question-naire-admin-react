let scene, renderer, camera
let cube

// 初始化場景、渲染器、相機、物體
function init () {
  // 建立場景
  scene = new THREE.Scene()

  // 建立渲染器
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight) // 場景大小
  renderer.setClearColor(1) // 預設背景顏色
  renderer.shadowMap.enable = true // 陰影效果

  // 將渲染器的 DOM 綁到 web 上
  document.body.appendChild(renderer.domElement)

  // 建立相機
  // PerspectiveCamera => 意指透視投影相機
  camera = new THREE.PerspectiveCamera(
    45, // 視角(指能從畫面上看到的視野範圍，一般遊戲會設在60-90度)
    window,innerWidth / window.innerHeight, // 畫面寬高比
    0.1, // 近面距離(意指從距離相機多近的地方開始渲染，一般推薦 0.1)
    100 // 遠面距離(意指相機可以看得多遠，數值越大視野越廣，一般推薦使用 1000，視需求調整，但設置過大會影響效能)
  )
  camera.position.set(10, 10, 10) // 相機位置
  camera.lookAt(scene.position) // 相機焦點

  // 建立物體
  const geometry = new THREE.BoxGeometry(1, 1, 1) // 幾何體(形狀)
  const material = new THREE.MeshPhongMaterial({
    color: 0x0000ff
  }) // 材質(顏色)
  cube = new THREE.Mesh(geometry, material) // 建立網格物件
  cube.position.set(0, 0, 0)
  scene.add(cube)
}

// 建立動畫
function animate () {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
}

// 渲染場景
function render () {
  animate()
  requestAnimationFrame(render)
  renderer.render(scene, camera)
}

// 監聽螢幕寬高變化來做簡單 RWD 設定
window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

init ()
render ()

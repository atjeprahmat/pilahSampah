const config = {
	lj_width: 100,
	lj_height: 100,
	s1: 8000,
	s2: 2000, // Parameter kecepatan penampilan
	point: 0, // skor pengguna
	totao_wrong: 0, // jumlah kegagalan
	sx: 2,
	sy: 2,
	level: 2,
	total_point: 0,
	box_width: 1200,
	box_height: 400,
}

function setXX(point, total) { // Peringkat Bintang
	let xx = ['img/xx1.png', 'img/xx2.png']
	if (point < total / 3) {
		return [xx[0], xx[0], xx[0]]
	} else if (point >= total / 3 && point < total / 2) {
		return [xx[1], xx[0], xx[0]]
	} else if (point >= total / 2 && point < total / 5 * 4) {
		return [xx[1], xx[1], xx[0]]
	} else if (point >= total / 5 * 4) {
		return [xx[1], xx[1], xx[1]]
	}
}
const level1 = {

	speed: 5,
	status: 1
}
let level = level1
const _time = {
	left: 110,
	top: 20,
	total: 120,
	timer: null,
	endInterval: function() {
		console.log(this)
		clearInterval(this.timer)

	},
	startInterval: function() {
		this.timer = setInterval(() => {
			if (this.total > 0) {
				let text = ''
				let hour = Math.floor(this.total / 3600)
				let min = Math.floor(this.total / 60) % 60
				let sec = this.total % 60
				hour = hour < 10 ? '0' + hour : hour
				min = min < 10 ? '0' + min : min
				sec = sec < 10 ? '0' + sec : sec
				text = hour + ':' + min + ':' + sec
				this.total--;
				$('.time').html(text)
			} else {
				let imgList = setXX(config.point, config.total_point)
				localStorage.setItem('p' + config.level, imgList)
				stopGame()
				let imgtext = ''
				imgList.forEach(ii => {
					imgtext += '<img src="' + ii + '"/>'
				})
				$('.fail-box').html(
					`
				<h2>Game Over</h2>
				<p>Skor Anda kali ini adalah : ${config.point}</p>
				<div>${imgtext}</div>
				<button type="button" onclick="location.reload()">Kembali</button>
				`
				)
				$('.fail-box').css({
					display: 'flex'
				})
				this.endInterval()
			}
		}, 1000)
	}
}
$('.time').css({
	'left': _time.left,
	'top': _time.top
})



function startInterval() {

}

// startInterval()
const lj_box = {
	width: 1200,
	height: 300,
	left: 0,
	bottom: 0,
	dbimg: 'url(img/db.jpg)',
	setPos: function() {
		$('.lj-box').css({
			width: this.width,
			height: this.height,
			left: this.left,
			bottom: this.bottom,
			backgroundImage: this.dbimg,

		})
	}
}


function creatLevel2(obj) {


}

function l2(obj) {


}

function CreateLJ(type, img) {
	this.type = type
	this.fx = Math.random()
	if (config.level == 1) {
		this.fx = 0.1
	}
	// seluruh kecepatan
	// console.log(this.fx)
	this.speedX = config.sx
	this.speedY = config.sy
	if (config.level == 3) {
		this.startX = Math.random() * 50
		this.startY = Math.random() * 50

	} else if (config.level == 1) {
		this.startX = 0
		this.startY = Math.random() * 200
	} else {
		this.startX = 0
		this.startY = Math.random() * 160


	}

	if (this.fx > 0.5) {
		this.startX = 1150 - this.startX
		this.speedX = -this.speedX
		console.log(this.speedX)
	}
	if (config.level == 3) {
		if (Math.random() > 0.5) {
			this.startY = 700 - this.startY
			this.speedY = -this.speedY
		}
	}
	this.mX = this.startX
	this.mY = this.startY
	this.p1 = null
	this.flag = 0
	this.timer = null
	// mencatat posisi sebelumnya
	this.dragX = this.startX
	this.dragY = this.startY
	console.log(this)
	let that = this
	// Memindahkan sampah
	this.lineMove = function() {
		console.log('Move')
		this.stopMove()
		this.timer = setInterval(() => {
			if (_time.total > 30 && _time.total < 35) { // Periode waktu ini ditambahkan sekali lagi, artinya periode waktu ini tiba-tiba menjadi lebih cepat, dan kemudian kecepatannya dipulihkan
				this.mX += this.speedX
				this.mY += this.speedY
			}
			this.mX += this.speedX
			this.mY += this.speedY
			// 
			if (config.level == 2) {
				if (this.mX > 550 && this.fx <= 0.5 || this.mX < 650 && this.fx > 0.5) { 
					this.speedX = 0
					this.speedY = config.sx
				}
				if(this.mX <= 550 && this.fx <= 0.5){
					this.speedX = config.sx
					this.speedY = 0
				}
				if(this.mX >= 650 && this.fx <= 0.5){
					this.fx=0.8
				}
				if(this.mX <= 550 && this.fx > 0.5){
					this.fx=0.4
				}
				if(this.mX >= 650 && this.fx > 0.5){
					this.speedX = -config.sx
					this.speedY = 0
				}
			}

			// 180=>100 1.8s 25n+ 4x=
			if ((this.mY > lj_box.height - config.lj_height / 2) ||
				((this.mX > lj_box.width - config.lj_width / 2) && this.fx) ||
				(this.fx > 0.5 && (this.mX < -config.lj_width / 2)) ||
				(config.level == 3 && (Math.abs(this.mX - lj_box.width / 2) < config.lj_width && Math.abs(this.mY - lj_box.height /
					2) < config.lj_height))
			) {
				// if (((this.mY > lj_box.height - config.lj_height/2) || (this.mX > lj_box.width - config.lj_width/2))&&this.fx<=0.5||this.fx>0.5&&(this.mX<-config.lj_width/2||this.mY<-config.lj_width/2)) {
				this.stopMove()
				this.p1.remove() //扣分
				config.totao_wrong += 1
				$('.wrong').html('Sampah yang terlewat：' + config.totao_wrong)
				if (config.totao_wrong == 5) {
					stopGame()
					let imgList = setXX(config.point, config.total_point)
					localStorage.setItem('p' + config.level, imgList)
					let imgtext = ''
					imgList.forEach(ii => {
						imgtext += '<img src="' + ii + '"/>'
					})
					$('.fail-box').html(
						`
					<h2>Game Over</h2>
					<p>Skor Anda kali ini adalah : ${config.point}</p>
					<div>${imgtext}</div>
					<button type="button" onclick="location.reload()">Kembali</button>
					`
					)
					$('.fail-box').css({
						display: 'flex'
					})
				}
			}
			$(this.p1).css({

				left: this.mX,
				top: this.mY,

			})
		}, 100)
	}
	this.stopMove = function() {

		clearInterval(this.timer)
		console.log(this.timer)
	}
	this.create = function() {
		this.p1 = document.createElement('div')
		$(this.p1).css({
			width: config.lj_width,
			height: config.lj_height,
			background: `url(${img}) no-repeat`,
			backgroundSize: 'contain',
			position: 'absolute',
			left: this.mX,
			top: this.mY,
			zIndex: 1000
		})
		// Hentikan timer saat menyeret, mulai ulang timer saat tidak menyeret
		this.lineMove()
		$('.lj-box').append(this.p1)
		this.p1.addEventListener('mousemove', this.drag, false)
		this.p1.addEventListener('mouseleave', this.dragEnd, false)
		// Ini digunakan untuk situasi di mana mouse bergerak terlalu cepat dan posisi sampah tidak mengikuti penurunan di tengah jalan
		this.p1.addEventListener('mouseup', this.dragEnd, false)
		this.p1.addEventListener('mousedown', this.dragStart, false)
	}
	this.drag = function(e) {
		console.log(that.flag)
		if (that.flag == 1) {

			let x1 = document.getElementsByClassName('container')[0].offsetLeft + this.parentNode.offsetLeft
			let y1 = document.getElementsByClassName('container')[0].offsetTop + this.parentNode.offsetTop
			// console.log(this.parentNode.offsetLeft)
			let moveX = e.clientX - this.offsetLeft - x1 - config.lj_width / 2
			let moveY = e.clientY - this.offsetTop - y1 - config.lj_height / 2
			that.mX = that.mX + moveX
			that.mY = that.mY + moveY
			// console.log(that.mY,that.mX)
			$(this).css({

				left: that.mX,
				top: that.mY
			})
		}

	}
	this.dragStart = function() { // ketika mulai menyeret sampahnya
		that.flag = 1
		that.dragX = that.mX
		that.dragY = that.mY
		console.log(that.flag)
		that.stopMove()
		$(this).css({
			zIndex: 100000
		})
	}
	// Saat mouse berhenti menyeret
	// 1. Tentukan apakah posisi saat ini bertepatan dengan tempat sampah (jenis yang sama), jika tidak - "kembali ke posisi semula (atau mundur)
	// True => Hilangkan sampah ini
	this.dragEnd = function() {
		if (that.flag == 0) {
			return
		}
		$(this).css({
			zIndex: 0
		})
		console.log('stop')
		that.flag = 0
		if(config.level==1){
			console.log(that.mY)
			// that.mX = that.dragX
			if(that.mY<0){
				that.mY = that.dragY
			}
			
		}else if(config.level==2){
			console.log(that.mY)
			if(that.mY<0||that.mY>160){
				that.mY = that.dragY
			}
		}else if(config.level==3){
			that.mX = that.dragX
			that.mY = that.dragY
		}
		// that.mX = that.dragX
		// that.mY = that.dragY
		// Sampah ada di dalam track div, dan track berada pada level yang sama dengan tempat sampah
		let mx = this.parentNode.offsetLeft + this.offsetLeft
		let my = this.parentNode.offsetTop + this.offsetTop
		// console.log(ljt1.a.offsetLeft+150,mx)
		// Di sini kami membuat tiga tong sampah
		let arr = [ljt1, ljt2, ljt3]
		for (let i = 0; i < arr.length; i++) {
			if (Math.abs(arr[i].a.offsetLeft - mx) < 150 && Math.abs(arr[i].a.offsetTop - my) < 170) {
				if (arr[i].type != that.type) {
					// Jika user salah memilah sampah, kembalikan object ke awal
					$(arr[i].a).css({
						backgroundColor: 'red'
					})
					setTimeout(() => {
						$(arr[i].a).css({
							backgroundColor: ''
						})
					}, 200)
					if (config.level == 2) {
						if (that.fx > 0.5) {

							that.speedX = -config.sx

						} else {
							that.speedX = config.sx
						}

						that.speedY = 0
					}


					that.mX = that.startX
					that.mY = that.startY
					$(this).css({

						left: that.startX,
						top: that.startY
					})
					that.lineMove()
					break;
				} else {
					// Jika User benar memilah sampahnya, tambahkan pointnya
					$(arr[i].a).css({
						backgroundColor: '#eee'
					})
					setTimeout(() => {
						$(arr[i].a).css({
							backgroundColor: ''
						})
					}, 200)
					config.point += 1
					$('.point').html('Point Benar ：' + config.point)
					this.remove()
					that.stopMove()
					break;
				}

			} else {
				that.lineMove()
				$(this).css({

					left: that.mX,
					top: that.mY
				})
				// console.log('fang')
			}
		}


	}



}

function Ljt(left, top, type) {
	this.left = left
	this.top = top
	this.type = type
	this.a = null
	this.create = function() {
		let img_list = ['./img/1clone1.png', './img/2clone2.png', './img/3clone3.png', './img/4.png']
		this.a = document.createElement('div')
		$(this.a).css({
			left: this.left,
			height: 170,
			width: 150,
			top: this.top,
			position: 'absolute',
			// background: '#bbb',
			backgroundImage: `url(${img_list[this.type-1]})`,
			backgroundSize: '100% 100%'
		})
		// this.a.src=img_list[this.type]
		$('.game-cont').append(this.a)
	}
}

const all_lj = [
	// Sampah Organik
	[
		'./img/cy/1.png', './img/cy/2.png', './img/cy/3.png', './img/cy/4.png',
		'./img/cy/5.png', './img/cy/6.png', './img/cy/7.png', './img/cy/8.png',
		'./img/cy/9.png', './img/cy/10.png', './img/cy/11.png', './img/cy/12.png',
		'./img/cy/13.png', './img/cy/14.png', './img/cy/15.png', './img/cy/16.png',
		'./img/cy/17.png', './img/cy/18.png', './img/cy/19.png', './img/cy/20.png',
		'./img/cy/21.png', './img/cy/22.png', './img/cy/23.png', './img/cy/24.png',
		'./img/cy/25.png',

	],
	// Sampah Residu
	[
		'./img/bkhs/2.png', './img/bkhs/5.png', './img/bkhs/5.png', './img/bkhs/5.png', './img/bkhs/5.png', 
		'./img/bkhs/7.png', './img/bkhs/8.png', './img/bkhs/8.png',  './img/bkhs/8.png', 
		'./img/bkhs/11.png', './img/bkhs/12.png', './img/bkhs/13.png', './img/bkhs/14.png',
		'./img/bkhs/16.png', './img/bkhs/20.png', './img/bkhs/20.png', './img/bkhs/20.png', './img/bkhs/20.png',
		'./img/bkhs/21.png', './img/bkhs/22.png', './img/bkhs/23.png', './img/bkhs/24.png', './img/bkhs/25.png'
	],
	// Sampah AnOrganik
	[
		'./img/khs/1.png', './img/khs/2.png', './img/khs/3.png', './img/khs/4.png', './img/khs/5.png',
		'./img/khs/6.png', './img/khs/7.png', './img/khs/8.png', './img/khs/9.png', './img/khs/10.png',
		'./img/khs/11.png', './img/khs/12.png', './img/khs/13.png', './img/khs/14.png', './img/khs/15.png',
		'./img/khs/16.png', './img/khs/17.png', './img/khs/18.png', './img/khs/19.png', './img/khs/20.png',
		'./img/khs/21.png', './img/khs/22.png', './img/khs/23.png', './img/khs/24.png', './img/khs/25.png',
	]
]
let lj_obj = []
let timerout_obj = []

function doCreate(level) {
	let will_show = []
	if (level == 1) {
		will_show = all_lj.map((item) => {
			// return item.slice(0, 15)
			return item.slice(0)
		})
	} else if (level == 2) {
		will_show = all_lj.map((item) => {
			// return item.slice(15)
			return item.slice(0)
		})
	} else {
		will_show = all_lj
	}
	will_show.forEach((wai, i) => {
		wai.sort(function() {
			return .5 - Math.random();
		});
		wai.forEach((item, j) => {

			let timerout = setTimeout(function() {
				let alj = new CreateLJ(i + 1, item)
				lj_obj.push(alj)
				alj.create()
			}, config.s1 * j + config.s2 * i)
			timerout_obj.push({
				timer: timerout,
				i: i,
				j: j,
				obj: item
			})

		})
	})
}

function stopGame() { // jeda permainan
	lj_obj.forEach(item => {
		item.stopMove()
	})
	timerout_obj.forEach(item => {
		clearTimeout(item.timer)
	})
	_time.endInterval()
	$('.bar').addClass('hides')

	$('.stop-btn').html('<span onclick="reStart()"><img src="./img/start.png"/></span>')
}

function reStart() { // Lanjutkan permainan
	lj_obj.forEach(item => {
		item.lineMove()
	})
	timerout_obj.forEach(item => {
		item.timer = setTimeout(function() {
			let alj = new CreateLJ(item.i + 1, item.obj)
			lj_obj.push(alj)
			alj.create()
		}, config.s1 * item.j + config.s2 * item.i)
	})
	_time.startInterval()
	$('.bar').removeClass('hides')

	$('.stop-btn').html('<span onclick="stopGame()"><img src="./img/stop.png"/></span>')
}
let ljt1, ljt2, ljt3
let bgm = document.getElementById('bgm')
let bgm_flag = 0

function bgmSound() {
	if (bgm_flag == 1) { // Untuk mematikan/menghidupkan BGM
		bgm.pause()
		bgm_flag = 0
	} else {
		bgm.play()
		bgm_flag = 1
	}
}

function init(level) { // Inisialisasi Permainan
	$('.game-cont').css({
		display: 'block'
	})
	if (level == 1) { 
		ljt1 = new Ljt(100, 100, 1)
		ljt1.create()
		ljt2 = new Ljt(700, 100, 2)
		ljt2.create()
		ljt3 = new Ljt(400, 100, 3)
		ljt3.create()
		config.sx = 2.5 // default = 2
		config.s1 = 5000 // sulit = 4500
		config.s2 = 2000 // sulit = 1500
		config.sy = 0
		_time.total = 60 // waktu game
		config.level = 1
		config.total_point = 45
		lj_box.height = 300
		lj_box.dbimg = 'url(img/db.jpg)'
	} else if (level == 2) {
		ljt1 = new Ljt(400, 40, 1)
		ljt1.create()
		ljt2 = new Ljt(800, 40, 2)
		ljt2.create()
		ljt3 = new Ljt(300, 500, 3)
		ljt3.create()
		config.sx = 3 // default = 2
		config.sy = 1 // default = 0
		config.s1 = 4500 // sulit = 4500, default = 8000
		config.s2 = 1000 // sulit = 1000, default = 3000
		// s1*15+s2*4
		_time.total = 90
		config.level = 2
		lj_box.height = 480
		config.total_point = 65
		lj_box.dbimg = 'url(img/db2.png)'
	} else if (level == 3) {
		ljt1 = new Ljt(550, 20, 1)
		ljt1.create()
		ljt2 = new Ljt(20, 250, 2)
		ljt2.create()
		ljt3 = new Ljt(1000, 250, 3)
		ljt3.create()
		config.sx = 2.6 // default = 1.3
		config.sy = 1.5 // default = 0.75
		config.s1 = 5000
		// s1*25+s2*4
		config.s2 = 2500
		_time.total = 120
		config.level = 3
		config.total_point = 80
		lj_box.height = 750
		lj_box.dbimg = 'url(img/db3.png)'
	}
	doCreate(level)
	lj_box.setPos()
	_time.startInterval()
	bgm.play()
	bgm_flag = 1
}
// init(1)
// lj.p

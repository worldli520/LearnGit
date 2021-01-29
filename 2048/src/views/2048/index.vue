<template>
	<div class="container">
		<div class="cellBox">
			<div
				class="cell"
				v-for="cell in data"
				:key="cell.num"
				:class="'x' + cell.x + 'y' + cell.y"
				:style="{
					background: cell.color,
				}"
			>
				{{ cell.num }}
			</div>
		</div>
		<div class="background">
			<div class="cell" v-for="i in 16" :key="i"></div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

interface Cell {
	num: number
	x: number
	y: number
	color: string
	canMove?: boolean
}

export default defineComponent({
	setup() {
		const color = {
			2: '#eee4da',
			4: '#ede0c8',
			8: '#f2b179',
			16: '#f59563',
			32: '#f67c5f',
			64: '#f65e3b',
			128: '#edcf72',
			256: '#edcc61',
			512: '#0444BF',
			1024: '#A79674',
			2048: '#282726',
			4096: '#280b21',
			8192: '#281d04',
		}

		const data = ref<Cell[]>([])
		//新增一个cell
		const addCell = () => {
			const num = randomNum()
			const cell: Cell = {
				num: num,
				x: randomXY(),
				y: randomXY(),
				color: color[num],
			}
			// console.log(cell)
			const _isExist = getCellByXY(cell.x, cell.y)
			// console.log(_isExist)
			if (_isExist) {
				addCell()
			} else {
				data.value.push(cell)
			}
		}
		//随机2/4
		const randomNum = () => {
			return Math.random() > 0.9 ? 4 : 2
		}
		//随机位置0123
		const randomXY = () => {
			return ~~(Math.random() * 4)
		}
		//验证新增位置是否已存在
		const getCellByXY = (x: number, y: number) => {
			return data.value.filter((cell) => cell).find((cell) => cell.x === x && cell.y === y)
		}
		//处理移动事件
		const turn = (direction: string) => {
			//给每一个cell的canMove设定为true
			data.value.forEach((e) => e && (e.canMove = true))
			//左移事件
			if (direction === 'left') {
				for (let i = 0; i < 4; i++) {
					for (let j = 0; j < 4; j++) {
						console.log(i, j)
					}
				}
			}
		}

		//页面挂载元素后新增两个数字
		onMounted(() => {
			addCell()
			addCell()

			document.addEventListener('keydown', (e) => {
				switch (e.key.toLocaleUpperCase()) {
					case 'ARROWRIGHT':
					case 'D':
						turn('right')
						break
					case 'ARROWLEFT':
					case 'A':
						turn('left')
						break
					case 'ARROWDOWN':
					case 'S':
						turn('down')
						break
					case 'ARROWUP':
					case 'W':
						turn('up')
						break
				}
			})
		})
		return {
			data,
		}
	},
})
</script>

<style scoped lang="scss">
.container {
	width: 400px;
	margin: 0 auto;
	.cellBox {
		position: absolute;
		width: 400px;
		height: 400px;
		padding: 16px;
		.cell {
			width: 80px;
			height: 80px;
			line-height: 80px;
			text-align: center;
			position: absolute;
			border-radius: 3px;
		}
	}
	.background {
		width: 400px;
		height: 400px;
		background: #bbada0;
		border-radius: 6px;
		padding: 16px;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.cell {
			width: 80px;
			height: 80px;
			background: rgba(238, 228, 218, 0.35);
			margin-bottom: 16px;
			border-radius: 3px;
		}
	}
	.x0y0 {
		top: 16px;
		left: 16px;
	}
	.x1y0 {
		top: 16px;
		left: 112px;
	}
	.x2y0 {
		top: 16px;
		left: 208px;
	}
	.x3y0 {
		top: 16px;
		left: 304px;
	}
	.x0y1 {
		top: 112px;
		left: 16px;
	}
	.x1y1 {
		top: 112px;
		left: 112px;
	}
	.x2y1 {
		top: 112px;
		left: 208px;
	}
	.x3y1 {
		top: 112px;
		left: 304px;
	}
	.x0y2 {
		top: 208px;
		left: 16px;
	}
	.x1y2 {
		top: 208px;
		left: 112px;
	}
	.x2y2 {
		top: 208px;
		left: 208px;
	}
	.x3y2 {
		top: 208px;
		left: 304px;
	}
	.x0y3 {
		top: 304px;
		left: 16px;
	}
	.x1y3 {
		top: 304px;
		left: 112px;
	}
	.x2y3 {
		top: 304px;
		left: 208px;
	}
	.x3y3 {
		top: 304px;
		left: 304px;
	}
}
</style>

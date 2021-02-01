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

//矢量数据结构
interface Vector {
	x: 0 | 1 | -1
	y: 0 | 1 | -1
}
//罗盘数据结构
interface XY {
	x: Array<number>
	y: Array<number>
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
		//键盘事件字典
		const mapDirection = { 38: 0, 39: 1, 40: 2, 37: 3, 87: 0, 68: 1, 83: 2, 65: 3 }
		//矢量方向字典
		const mapVector = {
			0: { x: 0, y: -1 },
			1: { x: 1, y: 0 },
			2: { x: 0, y: 1 },
			3: { x: -1, y: 0 },
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
			const _isExist = getCellByXY(cell)
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
		const getCellByXY = (pos: { x: number; y: number }) => {
			return data.value.filter((cell) => cell).find((cell) => cell.x === pos.x && cell.y === pos.y)
		}

		//创建遍历罗盘
		const buildTraversals = (vector: Vector) => {
			const traversals: XY = { x: [], y: [] }
			for (let pos = 0; pos < 4; pos++) {
				traversals.x.push(pos)
				traversals.y.push(pos)
			}
			if (vector.x === 1) traversals.x = traversals.x.reverse()
			if (vector.y === 1) traversals.y = traversals.y.reverse()
			return traversals
		}

		//处理移动事件
		const turn = (direction: number) => {
			//给每一个cell的canMove设定为true
			data.value.forEach((e) => e && (e.canMove = true))
			// console.log(direction)

			//获取矢量方向
			const vector: Vector = mapVector[direction]
			console.log(vector)
			//生成当前矢量方向的罗盘（罗盘遍历的第一个元素为移动方向最角上格子）
			const traversals = buildTraversals(vector)
			console.log(traversals)
			traversals.x.forEach((x) => {
				traversals.y.forEach((y) => {
					console.log(x, y)
				})
			})
		}

		//页面挂载元素后新增两个数字
		onMounted(() => {
			addCell()
			addCell()

			//键盘事件监听
			document.addEventListener('keydown', (e) => {
				const maped = e.keyCode
				turn(mapDirection[maped])
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

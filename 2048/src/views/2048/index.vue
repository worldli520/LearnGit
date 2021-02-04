<template>
	<div class="container">
		<div class="cellBox">
			<div
				class="cell animate__bounceIn animate__pulse"
				v-for="cell in data"
				:key="cell.id"
				:class="'x' + cell.x + 'y' + cell.y"
				:style="{
					background: color[cell.num],
					color: cell.num > 4 ? '#f9f6f2' : '#776e65',
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
	canMove?: boolean
	id: number
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

interface Postion {
	x: number
	y: number
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
			512: '#edc850',
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
		const step = ref(0)
		//新增一个cell
		const addCell = () => {
			const num = randomNum()
			const cell: Cell = {
				num: num,
				x: randomXY(),
				y: randomXY(),
				id: step.value,
			}
			const _isExist = getCellByXY(cell)
			if (_isExist) {
				addCell()
			} else {
				step.value++
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
			// console.log(vector)
			//生成当前矢量方向的罗盘（罗盘遍历的第一个元素为移动方向最角上格子）
			const traversals = buildTraversals(vector)
			// console.log(traversals)
			let moved: boolean = false
			traversals.x.forEach((x) => {
				traversals.y.forEach((y) => {
					const _isExist = getCellByXY({ x: x, y: y })

					if (_isExist) {
						const position = findFarthestPostion({ x: x, y: y }, vector)
						// console.log(_isExist)
						// console.log(position)
						const next = getCellByXY(position.next)
						if (next && next.num === _isExist.num && next.canMove) {
							//聚合Cell
							const nextIndex = data.value.findIndex((cell) => cell.x === next.x && cell.y === next.y)
							const positionIndex = data.value.findIndex((cell) => cell.x === _isExist.x && cell.y === _isExist.y)

							data.value[nextIndex].num = data.value[nextIndex].num * 2
							data.value[nextIndex].canMove = false
							data.value.splice(positionIndex, 1)
						} else {
							//移动当前cell到该矢量方向可移动的最远的地方
							moveCell(_isExist, position.farthest)
						}
						if (positionsEqual({ x: x, y: y }, _isExist)) {
							moved = true
						}
					}
				})
			})
			if (moved) {
				addCell()
			}
		}

		//找当前行或列矢量移动方向最远的单元格
		const findFarthestPostion = (cell: Postion, vector: Vector) => {
			let previous: Postion = { x: 0, y: 0 }
			do {
				previous = cell
				cell = { x: previous.x + vector.x, y: previous.y + vector.y }
			} while (withinBounds(cell) && !getCellByXY(cell))
			return { farthest: previous, next: cell }
		}

		//判断是否超出边界
		const withinBounds = (position: Postion) => {
			return position.x >= 0 && position.x < 4 && position.y >= 0 && position.y < 4
		}

		//移动单元格
		const moveCell = (cell: Cell, position: Postion) => {
			cell.x = position.x
			cell.y = position.y
		}
		// const doubleNum = (cell: Cell) => {
		// 	cell.num * 2
		// 	console.log(cell.num)
		// }

		//是否已经移动过了
		const positionsEqual = function(first: Postion, second: any) {
			return first.x === second.x && first.y === second.y
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
			color,
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
			font-size: 40px;
			font-weight: 700;
			transition: all 0.3s linear;
			// animation: scaleCell 0.2s;
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
	@for $i from 0 through 3 {
		@for $j from 0 through 3 {
			.x#{$i}y#{$j} {
				top: #{16 + $j * 96}px;
				left: #{16 + $i * 96}px;
			}
		}
	}
	@keyframes scaleCell {
		0% {
			scale: 1;
		}
		33% {
			scale: 1.1;
		}
		66% {
			scale: 0.9;
		}
		100% {
			scale: 1;
		}
	}
}
</style>

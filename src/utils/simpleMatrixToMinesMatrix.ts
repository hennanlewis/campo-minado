import {
	boardPositionDefaultValues,
	BoardPositionProps,
} from "../Types/BoardPosition"

export const simpleMatrixToMinesMatrix = (inputMatrix: number[][]) => {
	let minesMatrix: BoardPositionProps[][] = []
	let rows = inputMatrix.length
	let cols = inputMatrix[0].length

	for (let i = 0; i < rows; i++) {
		let row: BoardPositionProps[] = []
		for (let j = 0; j < cols; j++) {
			let item = { ...boardPositionDefaultValues }

			item = { ...item, isBomb: inputMatrix[i][j] === 1 ? true : false }
			item = { ...item, validNeighbor: returnValidNeighbor(i, j, rows, cols) }

			row.push(item)
		}
		minesMatrix.push(row)
	}

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			let item = minesMatrix[i][j]

			if (!item.isBomb) continue

			if (item.validNeighbor.includes("left")) {
				minesMatrix[i][j - 1] = incrementBombNumber(minesMatrix[i][j - 1])
			}

			if (item.validNeighbor.includes("right")) {
				minesMatrix[i][j + 1] = incrementBombNumber(minesMatrix[i][j + 1])
			}

			if (item.validNeighbor.includes("top")) {
				minesMatrix[i - 1][j] = incrementBombNumber(minesMatrix[i - 1][j])
			}

			if (item.validNeighbor.includes("bottom")) {
				minesMatrix[i + 1][j] = incrementBombNumber(minesMatrix[i + 1][j])
			}

			if (
				item.validNeighbor.includes("left") &&
				item.validNeighbor.includes("top")
			) {
				minesMatrix[i - 1][j - 1] = incrementBombNumber(
					minesMatrix[i - 1][j - 1]
				)
			}

			if (
				item.validNeighbor.includes("right") &&
				item.validNeighbor.includes("top")
			) {
				minesMatrix[i - 1][j + 1] = incrementBombNumber(
					minesMatrix[i - 1][j + 1]
				)
			}

			if (
				item.validNeighbor.includes("left") &&
				item.validNeighbor.includes("bottom")
			) {
				minesMatrix[i + 1][j - 1] = incrementBombNumber(
					minesMatrix[i + 1][j - 1]
				)
			}

			if (
				item.validNeighbor.includes("right") &&
				item.validNeighbor.includes("bottom")
			) {
				minesMatrix[i + 1][j + 1] = incrementBombNumber(
					minesMatrix[i + 1][j + 1]
				)
			}
		}
	}

	return minesMatrix
}

const returnValidNeighbor = (
	positionX: number,
	positionY: number,
	rowsNumber: number,
	colsNumber: number
) => {
	let item: string[] = []

	if (positionX > 0) item = [...item, "top"]
	if (positionY > 0) item = [...item, "left"]
	if (positionX < rowsNumber - 1) item = [...item, "bottom"]
	if (positionY < colsNumber - 1) item = [...item, "right"]

	return item
}

const incrementBombNumber = (boardPosition: BoardPositionProps) =>
	(boardPosition = {
		...boardPosition,
		bombsAround: boardPosition.bombsAround
			? Number(boardPosition.bombsAround) + 1
			: 1,
	})

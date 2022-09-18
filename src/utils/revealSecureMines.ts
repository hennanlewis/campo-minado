import { SetStateAction } from "react"

import { BoardPositionProps } from "../Types/BoardPosition"

export const revealSecureMines = (
	board: BoardPositionProps[][],
	row: number,
	col: number,
	setRevealedMines?: (data: SetStateAction<number>) => void
) => {
	let boardCopy = [...board]

	if (boardCopy[row][col]["mineIcon"] !== "none") return boardCopy
	if (boardCopy[row][col]["isRevealed"]) return boardCopy

	let itemIcon = boardCopy[row][col].isBomb
		? "bomb"
		: Number(boardCopy[row][col].bombsAround)

	boardCopy[row][col] = {
		...boardCopy[row][col],
		isRevealed: true,
		mineIcon: String(itemIcon),
	}

	if (setRevealedMines) setRevealedMines((value) => value + 1)

	if (itemIcon !== 0) return boardCopy

	if (boardCopy[row][col].validNeighbor.includes("left")) {
		boardCopy = revealSecureMines(boardCopy, row, col - 1, setRevealedMines)
	}

	if (boardCopy[row][col].validNeighbor.includes("right")) {
		boardCopy = revealSecureMines(boardCopy, row, col + 1, setRevealedMines)
	}

	if (boardCopy[row][col].validNeighbor.includes("top")) {
		boardCopy = revealSecureMines(boardCopy, row - 1, col, setRevealedMines)
	}

	if (boardCopy[row][col].validNeighbor.includes("bottom")) {
		boardCopy = revealSecureMines(boardCopy, row + 1, col, setRevealedMines)
	}

	if (
		boardCopy[row][col].validNeighbor.includes("left") &&
		boardCopy[row][col].validNeighbor.includes("top")
	) {
		boardCopy = revealSecureMines(boardCopy, row - 1, col - 1, setRevealedMines)
	}

	if (
		boardCopy[row][col].validNeighbor.includes("right") &&
		boardCopy[row][col].validNeighbor.includes("top")
	) {
		boardCopy = revealSecureMines(boardCopy, row - 1, col + 1, setRevealedMines)
	}

	if (
		boardCopy[row][col].validNeighbor.includes("left") &&
		boardCopy[row][col].validNeighbor.includes("bottom")
	) {
		boardCopy = revealSecureMines(boardCopy, row + 1, col - 1, setRevealedMines)
	}

	if (
		boardCopy[row][col].validNeighbor.includes("right") &&
		boardCopy[row][col].validNeighbor.includes("bottom")
	) {
		boardCopy = revealSecureMines(boardCopy, row + 1, col + 1, setRevealedMines)
	}

	return boardCopy
}

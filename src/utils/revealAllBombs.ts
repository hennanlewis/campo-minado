import { SetStateAction } from "react"
import { BoardPositionProps } from "../Types/BoardPosition"

export const revealAllBombs = (
	board: BoardPositionProps[][],
	setBoard: (data: SetStateAction<BoardPositionProps[][]>) => void
) => {
	let boardCopy = board

	const size = board.length
	let time = 100

	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			let itemIcon = boardCopy[i][j].isBomb
				? "bomb"
				: Number(boardCopy[i][j].bombsAround)

			if (boardCopy[i][j].isBomb) {
				boardCopy[i][j] = {
					...boardCopy[i][j],
					isRevealed: true,
					mineIcon: String(itemIcon),
				}

				setBoard(() => boardCopy)
			}
		}
	}
}

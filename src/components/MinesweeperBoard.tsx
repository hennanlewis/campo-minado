import { MouseEvent, SetStateAction } from "react"

import { BoardPositionProps } from "../Types/BoardPosition"
import { revealAllBombs } from "../utils/revealAllBombs"
import { revealSecureMines } from "../utils/revealSecureMines"
import { SelectedMineIcons } from "./SelectedMineIcons"

export const MinesweeperBoard = (props: {
	boardData: BoardPositionProps[][]
	setBoardData: (data: SetStateAction<BoardPositionProps[][]>) => void
	gameOver: boolean
	setGameOver: (data: SetStateAction<boolean>) => void
	setFlagsTotal: (data: SetStateAction<number>) => void
	setRevealedMines: (data: SetStateAction<number>) => void
}) => {
	const {
		boardData,
		setBoardData,
		gameOver,
		setGameOver,
		setFlagsTotal,
		setRevealedMines,
	} = props

	const handleClickMine = (row: number, col: number) => {
		if (gameOver) return
		if (boardData[row][col]["mineIcon"] === "flag") return

		if (boardData[row][col]["isBomb"]) {
			revealAllBombs(boardData, setBoardData)
			setGameOver(true)
		}

		setBoardData(revealSecureMines(boardData, row, col, setRevealedMines))
	}

	const handleContextOption = (row: number, col: number, event: MouseEvent) => {
		event.preventDefault()

		if (gameOver) return
		if (boardData[row][col]["isRevealed"]) return

		let mineIcon = boardData[row][col]["mineIcon"] === "flag" ? "none" : "flag"
		setFlagsTotal((value) => (mineIcon === "flag" ? value + 1 : value - 1))
		setBoardData((oldValue) => {
			oldValue[row][col] = { ...oldValue[row][col], mineIcon }
			return [...oldValue]
		})
	}

	return (
		<>
			{boardData.map((row, rowIndex) =>
				row.map((item, colIndex) => (
					<button
						key={colIndex}
						className={`minesIcon-${item.mineIcon}`}
						onClick={() => handleClickMine(rowIndex, colIndex)}
						onContextMenu={(event) =>
							handleContextOption(rowIndex, colIndex, event)
						}
					>
						{item.mineIcon === "none" || item.mineIcon === "0" ? (
							""
						) : (
							<SelectedMineIcons selectedIcon={item.mineIcon} />
						)}
					</button>
				))
			)}
		</>
	)
}

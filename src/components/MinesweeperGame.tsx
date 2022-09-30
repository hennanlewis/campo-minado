import { useEffect, useState } from "react"
import { FaRegStar, FaStar } from "react-icons/fa"
import { RiRefreshFill } from "react-icons/ri"

import { generateRandomPositionArray } from "../utils/generateRandomPositionArray"
import { simpleMatrixToMinesMatrix } from "../utils/simpleMatrixToMinesMatrix"
import { BoardPositionProps } from "../Types/BoardPosition"
import { arrayToMatrix } from "../utils/arrayToMatrix"
import { MinesweeperBoard } from "./MinesweeperBoard"
import { EndGameOptions } from "./EndGameOptions"
import { EmptyBoard } from "./EmptyBoard"
import "./styles.css"
import { StarLevelButton } from "./StarLevelButton"

export const MinesweeperGame = () => {
	const [flagsTotal, setFlagsTotal] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const [gameOver, setGameOver] = useState(false)
	const [revealedMines, setRevealedMines] = useState(0)
	const [selectedLevel, setSelectedLevel] = useState("easy")
	const levelSize: { [key: string]: number } = {
		easy: 8,
		medium: 10,
		hard: 12,
	}

	const bombsPerLevel: { [key: string]: number } = {
		easy: 10,
		medium: 18,
		hard: 25,
	}

	const [minesPositionsArray, setMinesPositionsArray] = useState(
		generateRandomPositionArray(
			bombsPerLevel[selectedLevel],
			levelSize[selectedLevel]
		)
	)

	const minesArray = Array(levelSize[selectedLevel] ** 2)
		.fill(0)
		.map((item, index) => (minesPositionsArray.includes(index) ? 1 : 0))

	const minesMatrix = arrayToMatrix(minesArray, levelSize[selectedLevel])

	const [minesBoardData, setMinesBoardData] = useState<BoardPositionProps[][]>(
		simpleMatrixToMinesMatrix(minesMatrix)
	)

	const handleRestartGame = () => {
		setMinesPositionsArray(
			generateRandomPositionArray(
				bombsPerLevel[selectedLevel],
				levelSize[selectedLevel]
			)
		)
		setMinesBoardData(simpleMatrixToMinesMatrix(minesMatrix))
		setGameOver(false)
		setFlagsTotal(0)
		setRevealedMines(0)
	}

	const winGame = () => {
		return (
			revealedMines ==
			levelSize[selectedLevel] ** 2 - bombsPerLevel[selectedLevel]
		)
	}

	const bombInFirstMine = () => revealedMines == 0 && gameOver

	useEffect(() => {
		setIsLoading(true)

		setMinesPositionsArray(
			generateRandomPositionArray(
				bombsPerLevel[selectedLevel],
				levelSize[selectedLevel]
			)
		)
	}, [selectedLevel])

	useEffect(() => {
		setMinesBoardData(simpleMatrixToMinesMatrix(minesMatrix))
		setIsLoading(false)
	}, [minesPositionsArray])

	return (
		<main className="minesweeper-board">
			<section className={`minesweeper-${selectedLevel}`}>
				{isLoading ? (
					<EmptyBoard levelSize={levelSize[selectedLevel]} />
				) : (
					<MinesweeperBoard
						boardData={minesBoardData}
						setBoardData={setMinesBoardData}
						gameOver={gameOver}
						setGameOver={setGameOver}
						setRevealedMines={setRevealedMines}
						setFlagsTotal={setFlagsTotal}
					/>
				)}
			</section>

			{winGame() && (
				<EndGameOptions
					endGameType="win"
					handleRestartGame={handleRestartGame}
				/>
			)}

			{gameOver && !bombInFirstMine() && (
				<EndGameOptions
					endGameType="lose"
					handleRestartGame={handleRestartGame}
				/>
			)}

			{bombInFirstMine() && (
				<EndGameOptions
					endGameType="first"
					handleRestartGame={handleRestartGame}
				/>
			)}

			<section className="minesweeper_menu">
				<div className="minesweeper-menu-level">
					<span>Nível: </span>
					<StarLevelButton setSelectedLevel={setSelectedLevel} level="easy">
						<FaStar />
					</StarLevelButton>
					<StarLevelButton setSelectedLevel={setSelectedLevel} level="medium">
						{selectedLevel != "easy" ? <FaStar /> : <FaRegStar />}
					</StarLevelButton>
					<StarLevelButton setSelectedLevel={setSelectedLevel} level="hard">
						{selectedLevel == "hard" ? <FaStar /> : <FaRegStar />}
					</StarLevelButton>
					<button
						className="ml-2 text-[120%]"
						onClick={handleRestartGame}
						title="Reiniciar jogo"
					>
						<RiRefreshFill />
					</button>
				</div>
				<div>
					<span>Locais suspeitos: {flagsTotal}</span>
				</div>
			</section>
			<section className="minesweeper-rules">
				<h3>Regras:</h3>
				<ul>
					<li>Clique nas peças para revelá-las;</li>
					<li>Cada peça pode ter ou não bombas;</li>
					<li>Ao revelar peças que possuem bombas, você perde;</li>
					<li>
						Ao revelar peças que não possuem bombas, pode ter ou não um número;
					</li>
					<li>
						O número que aparece representa a quantidade de bombas existentes
						nas peças vizinhas (incluindo as peças nas diagonais);
					</li>
					<li>
						Peças reveladas que não possuem números revelam todas as peças
						vizinhas (incluindo as peças nas diagonais) automaticamente.
					</li>
				</ul>
			</section>
		</main>
	)
}

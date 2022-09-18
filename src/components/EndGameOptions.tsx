import { FaBomb } from "react-icons/fa"

interface EndGameOptionsProps {
	endGameType: string
	handleRestartGame: () => void
}

export const EndGameOptions = (props: EndGameOptionsProps) => {
	const { endGameType, handleRestartGame } = props
	const messages = {
		win: "Parabens, você ganhou!",
		lose: "Infelizmente você perdeu :(",
		first: [
			"De primeira? Hahaha",
			"Azar que chama hahaha",
			"Mais sorte na próxima :(",
			"Assim não, né!",
		],
	}
	return (
		<section className="minesweeper-endgame">
			<div>
				{endGameType === "win" && <h3>{messages.win}</h3>}
				{endGameType === "lose" && <h3>{messages.lose}</h3>}
				{endGameType === "first" && (
					<h3>
						{messages.first[Math.floor(Math.random() * messages.first.length)]}
					</h3>
				)}
				<button
					className={
						endGameType === "win"
							? "minesweeper-endgame-win"
							: "minesweeper-endgame-lose"
					}
					onClick={handleRestartGame}
				>
					Novo jogo
					<FaBomb />
				</button>
			</div>
		</section>
	)
}

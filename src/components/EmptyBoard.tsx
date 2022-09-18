export const EmptyBoard = (props: { levelSize: number }) => {
	const { levelSize } = props
	const emptyMines: string[][] = Array(levelSize).fill(
		Array(levelSize).fill("")
	)

	return (
		<>
			{emptyMines.map((row) =>
				row.map((col, colIndex) => (
					<button key={colIndex} className="minesIcon-none">
						{col}
					</button>
				))
			)}
		</>
	)
}

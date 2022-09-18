export type BoardPositionProps = {
	isRevealed: boolean
	isBomb: boolean
	bombsAround: number | ""
	validNeighbor: string[]
	mineIcon: string
}

export const boardPositionDefaultValues: BoardPositionProps = {
	isRevealed: false,
	isBomb: false,
	bombsAround: "",
	validNeighbor: [],
	mineIcon: "none",
}

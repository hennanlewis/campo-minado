export const arrayToMatrix = (inputArray: number[], levelSize: number) => {
	let minesMatrix: number[][] = []

	for (let i = 0; i < levelSize; i++) {
		let row: number[] = []

		for (let j = 0; j < levelSize; j++) {
			let item = inputArray[i * levelSize + j]
			row.push(item)
		}

		minesMatrix.push(row)
	}

	return minesMatrix
}

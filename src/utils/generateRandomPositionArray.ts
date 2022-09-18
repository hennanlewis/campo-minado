export const generateRandomPositionArray = (length: number, size: number) => {
	let generatedArray: number[] = []

	for (;;) {
		const randomValue = Math.floor(Math.random() * (size * size))

		if (!generatedArray.includes(randomValue)) {
			generatedArray.push(randomValue)
		}

		if (generatedArray.length === length) {
			return generatedArray
		}
	}
}

import { SetStateAction } from "react"

import "./styles.css"

interface StarCheckboxProps {
	children: JSX.Element
	level: string
	setSelectedLevel: (value: SetStateAction<string>) => void
}

export const StarLevelButton = (props: StarCheckboxProps) => {
	const { children, level, setSelectedLevel } = props
	const selectLevel = () => {
		setSelectedLevel(level)
	}

	return (
		<button onClick={selectLevel}>
			<span>{children}</span>
		</button>
	)
}

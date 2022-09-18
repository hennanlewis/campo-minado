import { GiLandMine, GiMineExplosion } from "react-icons/gi"
import { BsPatchExclamationFill } from "react-icons/bs"

export const SelectedMineIcons = (props: { selectedIcon: string }) => {
	const { selectedIcon } = props
	const icons: { [key: string]: string | JSX.Element } = {
		none: "none",
		bomb: <GiMineExplosion className="text-2xl" />,
		flag: <BsPatchExclamationFill className="text-2xl" />,
		"0": "0",
		"1": "1",
		"2": "2",
		"3": "3",
		"4": "4",
		"5": "5",
		"6": "6",
		"7": "7",
		"8": "8",
	}

	return <>{icons[selectedIcon]}</>
}

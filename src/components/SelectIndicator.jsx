import * as React from 'react';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

export default function SelectIndicator(props) {
	const [type, setType] = React.useState('');
	const handleType = (event, newValue) => {
		setType(newValue);
	};
	return (
		<Select
			disabled={props.disabled}
			placeholder='Select'
			onChange={handleType}
			indicator={<KeyboardArrowDown />}>
			{props.type.map((val, index) => {
				return <Option value={val}>{val}</Option>;
			})}
		</Select>
	);
}

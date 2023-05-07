import * as React from 'react';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

export default function SelectIndicator(props) {
	return (
		<Select
			disabled={props.disabled}
			placeholder='Select'
			indicator={<KeyboardArrowDown />}>
			{props.type.map((val, index) => {
				return <Option value={val}>{val}</Option>;
			})}
		</Select>
	);
}

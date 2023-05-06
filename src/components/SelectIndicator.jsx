import * as React from 'react';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

export default function SelectIndicator(props) {
	return (
		<Select
			disabled={props.disabled}
			placeholder='Select a pet…'
			indicator={<KeyboardArrowDown />}>
			<Option value='dog'>Dog</Option>
			<Option value='cat'>Cat</Option>
			<Option value='fish'>Fish</Option>
			<Option value='bird'>Bird</Option>
		</Select>
	);
}

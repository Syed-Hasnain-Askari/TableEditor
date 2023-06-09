import React, { useState, useEffect } from 'react';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

export default function SelectIndicator(props) {
	return (
		<Select
			disabled={props.disabled}
			placeholder={props.placeholder ? props.placeholder : 'Select'}
			onChange={props.onChange}>
			{props?.type?.map((val, index) => {
				return (
					<Option
						key={index}
						value={val}>
						{val}
					</Option>
				);
			})}
		</Select>
	);
}

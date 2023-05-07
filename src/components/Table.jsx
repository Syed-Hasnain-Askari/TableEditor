import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import SelectIndicator from './SelectIndicator';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import BasicModal from '../components/Modal';
import DoneIcon from '@mui/icons-material/Done';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

function createData(name, calories, fat, carbs, protein, size) {
	return { name, calories, fat, carbs, protein, size };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 1.2),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 1.9),
	createData('Eclair', 262, 16.0, 24, 6.0, 1.2),
	createData('Cupcake', 305, 3.7, 67, 4.3, 3.4),
	createData('Gingerbread', 356, 16.0, 49, 3.9, 2.4),
];
export default function UserTable(props) {
	const [edit, setEdit] = useState(-1);
	const [data, setData] = useState(props?.data?.Items);
	console.log(data, 'this is my data');
	const onEdit = (index) => {
		setEdit(index);
	};

	const onSave = () => {
		setEdit(-1);
	};
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<BasicModal
				open={open}
				handleClose={handleClose}
			/>
			<TableContainer
				component={Paper}
				style={{ width: '100%' }}>
				<Table
					borderAxis='bothBetween'
					stripe='odd'
					hoverRow>
					<TableHead>
						<TableRow>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell>EPSG</StyledTableCell>
							<StyledTableCell>Epoch</StyledTableCell>
							<StyledTableCell>Geoid</StyledTableCell>
							<StyledTableCell>Acq</StyledTableCell>
							<StyledTableCell>Type</StyledTableCell>
							<StyledTableCell>Size</StyledTableCell>
							<StyledTableCell></StyledTableCell>
							<StyledTableCell></StyledTableCell>
							<StyledTableCell></StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data != null &&
							data.map((row, index) => {
								return (
									<StyledTableRow key={index}>
										{edit === index ? (
											<>
												<StyledTableCell>
													<Input defaultValue={row.Name} />
												</StyledTableCell>
												<StyledTableCell>
													<Input defaultValue={row.EPSG} />
												</StyledTableCell>
												<StyledTableCell>
													<Input defaultValue={row.Epoch} />
												</StyledTableCell>
												<StyledTableCell>
													<Input defaultValue={row.Geoid} />
												</StyledTableCell>
												<StyledTableCell>
													<Select
														placeholder='Select'
														disabled={false}>
														{row.Acq.map((value, index) => {
															return <Option value={value}>{value}</Option>;
														})}
													</Select>
												</StyledTableCell>
												<StyledTableCell>
													<SelectIndicator
														disabled={false}
														type={row.Type}
													/>
												</StyledTableCell>
												<StyledTableCell>
													<Input defaultValue={row.Size} />
												</StyledTableCell>
											</>
										) : (
											<>
												<StyledTableCell>{row.Name}</StyledTableCell>
												<StyledTableCell>{row.EPSG}</StyledTableCell>
												<StyledTableCell>{row.Epoch}</StyledTableCell>
												<StyledTableCell>{row.Geoid}</StyledTableCell>
												<StyledTableCell>
													<Select
														placeholder='Select a pet…'
														disabled={true}>
														{row.Acq.map((value, index) => {
															<Option value={value}>{value}</Option>;
														})}
													</Select>
												</StyledTableCell>
												<StyledTableCell>
													<SelectIndicator
														disabled={true}
														type={row.Type}
													/>
												</StyledTableCell>
												<StyledTableCell>{row.Size}</StyledTableCell>
											</>
										)}
										<StyledTableCell>
											{edit === index ? (
												<IconButton
													onClick={onSave}
													edge='end'
													aria-label='save'>
													<SaveIcon />
												</IconButton>
											) : (
												<IconButton
													onClick={() => onEdit(index)}
													edge='end'
													aria-label='edit'>
													<EditIcon />
												</IconButton>
											)}
										</StyledTableCell>
										<StyledTableCell>
											<IconButton
												onClick={handleOpen}
												edge='end'
												aria-label='delete'>
												<DeleteIcon />
											</IconButton>
										</StyledTableCell>
										<StyledTableCell>
											<IconButton
												onClick={handleOpen}
												edge='end'
												aria-label='action'>
												<DoneIcon />
											</IconButton>
										</StyledTableCell>
									</StyledTableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

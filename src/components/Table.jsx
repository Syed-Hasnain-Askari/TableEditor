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
import { DatePicker, Space } from 'antd';
import CancelIcon from '@mui/icons-material/Cancel';
import SelectIndicator from './SelectIndicator';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import BasicModal from '../components/Modal';
import ComingSoonModal from '../components/ComingSoonModal';
import DoneIcon from '@mui/icons-material/Done';
import dayjs from 'dayjs';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
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
export default function UserTable(props) {
	const [edit, setEdit] = useState(-1);
	const [name, setName] = useState('');
	const [epsg, setEpsg] = useState('');
	const [epoch, setEpoch] = useState('');
	const [geoid, setGeoId] = useState('');
	const [size, setSize] = useState('');
	const [acq, setAcq] = useState('');
	const [type, setType] = useState('');
	const dateFormat = 'YYYY/MM/DD';
	const [data, setData] = useState(props?.data?.Items);
	const [geoIds, setGeoIds] = useState([
		'GEOID18',
		'GEOID12B',
		'GEOID12A',
		'GEOID12',
		'GEOID09',
		'GEOID03',
		'GEOID06',
		'GEOID99',
		'GEOID96',
	]);
	const [types, setTypes] = useState([
		'Aerial LIDAR',
		'Aerial Photogrammetry',
		'Terrestrial LIDAR',
		'Terrestrial Photogrammetry',
	]);
	const onEdit = (index, id) => {
		setEdit(index);
	};
	const updatedItem = {
		name: name,
		raw_epsg: epsg,
		raw_epoch: epoch,
		raw_geoid: geoid,
		acquisition_date: acq,
		acquisition_type: type,
	};
	const onSave = (id) => {
		setEdit(-1);
		props.updateData(id, updatedItem);
	};
	const onCancel = () => {
		setEdit(-1);
	};
	const [open, setOpen] = useState(false);
	const [comingSoon, setComingSoon] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleComingSoon = () => setComingSoon(true);
	const handleCloseComingSoon = () => {
		setComingSoon(false);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleGeoId = (event, newValue) => {
		setGeoId(newValue);
	};
	const handleType = (event, newValue) => {
		setType(newValue);
	};
	const onChange = (date, dateString) => {
		setAcq(dateString);
	};
	React.useEffect(() => {}, [type]);
	return (
		<>
			<BasicModal
				open={open}
				handleClose={handleClose}
			/>
			<ComingSoonModal
				open={comingSoon}
				handleCloseComingSoon={() => handleCloseComingSoon()}
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
													<Input
														defaultValue={row.name}
														id='name'
														name='name'
														onChange={(e) => setName(e.target.value)}
													/>
												</StyledTableCell>
												<StyledTableCell>
													<Input
														defaultValue={row.raw_epsg}
														id='epsg'
														name='epsg'
														onChange={(e) => setEpsg(e.target.value)}
													/>
												</StyledTableCell>
												<StyledTableCell>
													<Input
														defaultValue={row.raw_epoch}
														id='epoch'
														name='epoch'
														onChange={(e) => setEpoch(e.target.value)}
													/>
												</StyledTableCell>
												<StyledTableCell>
													<SelectIndicator
														onChange={handleGeoId}
														placeholder={row.raw_geoid}
														disabled={false}
														type={geoIds}
													/>
												</StyledTableCell>
												<StyledTableCell>
													<Space direction='vertical'>
														<DatePicker
															onChange={onChange}
															defaultValue={dayjs(row.acquisition_date, dateFormat)}
															format={dateFormat}
														/>
													</Space>
												</StyledTableCell>
												<StyledTableCell>
													<SelectIndicator
														onChange={handleType}
														placeholder={row.acquisition_type}
														disabled={false}
														type={types}
													/>
												</StyledTableCell>
												<StyledTableCell>{row.raw_size}</StyledTableCell>
											</>
										) : (
											<>
												<StyledTableCell>{row.name}</StyledTableCell>
												<StyledTableCell>{row.raw_epsg}</StyledTableCell>
												<StyledTableCell>{row.raw_epoch}</StyledTableCell>
												<StyledTableCell>{row.raw_geoid}</StyledTableCell>
												<StyledTableCell>{row.acquisition_date}</StyledTableCell>
												<StyledTableCell>{row.acquisition_type}</StyledTableCell>
												<StyledTableCell>{row.raw_size}</StyledTableCell>
											</>
										)}
										<StyledTableCell>
											{edit === index ? (
												<IconButton
													onClick={() => onSave(row.Id)}
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
												onClick={handleComingSoon}
												edge='end'
												aria-label='download'>
												<DownloadForOfflineIcon />
											</IconButton>
										</StyledTableCell>
										<StyledTableCell>
											{edit === index ? (
												<IconButton
													onClick={() => onCancel()}
													edge='end'
													aria-label='action'>
													<CancelIcon />
												</IconButton>
											) : (
												<IconButton
													onClick={handleOpen}
													edge='end'
													aria-label='action'>
													<DoneIcon />
												</IconButton>
											)}
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

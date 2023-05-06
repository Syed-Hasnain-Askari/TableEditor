import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { Tune } from '@mui/icons-material';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function BasicModal(props) {
	const handleClose = () => {
		props.handleClose();
	};
	return (
		<div>
			<Modal
				open={props.open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<Typography
						id='modal-modal-title'
						variant='h6'
						component='h2'
						align='center'>
						Are you sure
					</Typography>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<Button
							style={{ marginRight: 10 }}
							onClick={() => handleClose()}
							variant='outlined'
							startIcon={<DeleteIcon />}>
							Delete
						</Button>
						<Button
							onClick={() => handleClose()}
							variant='outlined'
							endIcon={<CancelIcon />}>
							Cancel
						</Button>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}

import React from 'react';

import { Input } from 'antd';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogueTitle from '../dialogueTitle/dialogueTitle.component'

import styles from './createBoardDialogue.module.scss';


const CreateBoardDialogue = ({ open, handleClose, title, settitle, handleSubmit }) => {
    return (
        <Dialog className="float-Dialogue"
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <div className={styles.dialogueContainer}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.dialogueContent}>
                        <DialogueTitle id="customized-dialog-title" onClose={handleClose}>
                            <Input className={styles.input} value={title} onChange={e => settitle(e.target.value)} placeholder="Add Board Title" autoFocus />
                        </DialogueTitle>
                        <DialogContent >
                            Trello Workspace
                        </DialogContent>
                    </div>
                    <div className={styles.dialogueAction} >
                        <Button onClick={handleSubmit} variant="contained" disabled={title ? false : true} type='submit'>
                            Create Board
                        </Button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
};

export default CreateBoardDialogue;
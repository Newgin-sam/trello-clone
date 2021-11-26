import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArticleIcon from '@mui/icons-material/Article';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';


import { v4 as uuidv4 } from 'uuid';

import styles from './dashboard.module.scss';

import BoardCard from '../../component/boardCard/boardCard.components';
import CreateBoardDialogue from '../../component/createBoardDialogue/createBoardDialogue.component';

import { workspace } from '../../models/workspace';

let user = "newuserid";



const getBoard = (list) => (
    list.map(el =>
        <BoardCard id={el.id} title={el.title} />
    )
)


const CreateBoard = ({ handleClick }) => (
    <div className={styles.cardContainer}>
        <Card sx={{ minWidth: 200, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f5f7', cursor: 'pointer' }} onClick={handleClick} >
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Create new Board
            </Typography>
        </Card>
    </div>
)


const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [boardList, setboardList] = useState(undefined)
    const [title, settitle] = useState("");
    let navigate = useNavigate();
    useEffect(() => {
        if (!workspace[user]) {
            workspace[user] = {}
            workspace[user].board = []
        } else if (!workspace[user].board) {
            workspace[user].board = []
        }
        setboardList(workspace[user].board);
    }, [])

    const handleSubmit = () => {
        if (title) {
            let obj = {};
            obj.id = uuidv4();
            obj.title = title;
            workspace[user].board.push(obj);
            setboardList(workspace[user].board);
            setOpen(false);
            navigate(`/board/${obj.id}`);
        }
    }
    const handleClose = () => {
        setOpen(false);
        settitle("");
    }

    return (
        <div className={styles.container}>
            <div className={styles.dashnav}>
                <Stack direction="column" spacing={2} className={styles.stack}>
                    <Button variant="contained" className={`${styles.list} ${styles.list_active}`} > <ArticleIcon /> Board</Button>
                    <Button variant="contained" className={styles.list} > <ArticleIcon /> Template </Button>
                    <Button variant="contained" className={styles.list} > <ArticleIcon /> Home </Button>
                </Stack>
            </div>

            <div className={styles.workspace}>
                <h1> Workspace</h1>

                <div className={styles.wklayout}>
                    {boardList && getBoard(boardList)}
                    <CreateBoard handleClick={() => setOpen(true)} />
                    <CreateBoardDialogue open={open} handleClose={handleClose} title={title} settitle={settitle} handleSubmit={handleSubmit} />
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
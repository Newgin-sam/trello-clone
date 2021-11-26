import React, { useEffect, useState } from 'react';
import styles from './board.module.scss';
import BoardList from '../../component/boardList/boardList.component';
import Card from '@mui/material/Card';
import { Button } from '@mui/material'
import { Board as boardObj, workspace } from '../../models/workspace';
import { Input } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)

let boardId;

const getBoard = (list) => (
    list.map(el => (
        <BoardList id={el.id} title={el.title} />
    ))
)

const Board = () => {

    const [list, setList] = useState(undefined);
    const [boardTitle, setboardTitle] = useState(undefined);
    const [addList, setaddList] = useState(false);
    const [listname, setlistname] = useState("")

    useEffect(() => {
        boardId = getLastItem(window.location.pathname);
        if (!boardObj[boardId]) {
            boardObj[boardId] = {};
            boardObj[boardId].List = [];
        }
        setList(boardObj[boardId]);
        const { title } = workspace.newuserid.board.find(el => el.id === boardId)
        setboardTitle(title);
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (listname) {
            let obj = {};
            obj.id = uuidv4();
            obj.title = listname;
            boardObj[boardId].List.push(obj);
            // setList(boardObj[boardId]);
            // setaddList(false);
            setlistname("");
        }
    }

    const closeaddList = () => {
        setaddList(false);
        setlistname("");
    }

    return (
        <div className={styles.boardLayout}>
            <div className={styles.bar}>

            </div>

            <div className={styles.boardContainer}>
                <h3 className={styles.boardheader}>{boardTitle}</h3>
                <div className={styles.listContainer}>
                    {list && getBoard(list.List)}
                    <Card sx={{ width: 250, padding: '10px', backgroundColor: '#ededed', height: 'fit-content', marginRight: '1rem' }} >

                        {!addList ?
                            (<Button className={styles.addButton} onClick={() => setaddList(true)}  >
                                <span className={styles.buttonTitle}> <AddIcon className={styles.icon} /> {list && list.List.length > 0 ? 'Add another List' : 'Add a List'}</span>
                            </Button>
                            ) :
                            (<div className={styles.actionContainer}>
                                <form onSubmit={handleSubmit} >
                                    <Input className={styles.input} placeholder="Enter list title..." value={listname} onChange={e => setlistname(e.target.value)} autoFocus />
                                    <div className={styles.actions}>
                                        <Button variant="contained" type="submit">Add List</Button>
                                        <CloseIcon sx={{ fontSize: 30, color: '#6b778c', marginLeft: '5px', cursor: 'pointer' }} onClick={closeaddList} />
                                    </div>
                                </form>
                            </div>
                            )
                        }
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Board;
import React, { useEffect, useState, useRef } from 'react';

import { Input } from 'antd';
import Card from '@mui/material/Card';
import { Button, CardActions } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DetailCardDialogue from '../detailCardDialogue/detailCardDialogue.component';

import { v4 as uuidv4 } from 'uuid';

import { Board, List } from '../../models/workspace';

import styles from './boardList.module.scss';


const { TextArea } = Input;

const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)

let boardId;


const TitleCard = (list, handleCardClick) => (
    list.map((el, idx) => (
        <div className={styles.cardTitle} onClick={() => handleCardClick(idx)}>
            {el.title}
        </div>
    ))
)

const BoardList = ({ id, title }) => {

    const [addCard, setaddCard] = useState(false);
    const [listTitle, setlistTitle] = useState("");
    const [cardTitle, setcardTitle] = useState("");
    const [currentCard, setcurrentCard] = useState(undefined);
    const [cardList, setcardList] = useState(undefined);

    const [openCard, setopenCard] = useState({ open: false, idx: null });
    const [cardDialogueTitle, setcardDialogueTitle] = useState("")

    const formRef = useRef(null);

    useEffect(() => {
        boardId = getLastItem(window.location.pathname);
        if (!List[id]) {
            List[id] = {};
            List[id].card = [];
        } else if (!List[id].card) {
            List[id].card = [];
        }
        setcardList(List[id]);
        setlistTitle(title);
    }, []);


    const handleChange = (e) => {
        setcardTitle(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (cardTitle) {
            let obj = {};
            obj.id = uuidv4();
            obj.title = cardTitle;
            List[id].card.push(obj);
            setcardList(List[id])
            // setaddCard(false);
            setcardTitle("");
        }
        console.log("submit");
    }

    const closeaddCard = () => {
        setaddCard(false);
        setcardTitle("");
    }

    const submitOnEnter = e => {
        if (e.which === 13) {
            handleSubmit(e);
        }
    }

    const listTitleChange = () => {
        if (listTitle) {
            Board[boardId].List.map((el, idx) => {
                if (el.id === id) {
                    Board[boardId].List[idx].title = listTitle;
                    return null;
                }
            })
        } else {
            setlistTitle(title);
        }
    }

    const handleCardClick = (idx) => {
        setcardDialogueTitle(cardList.card[idx].title);
        setcurrentCard(cardList.card[idx]);
        setopenCard({ open: true, idx: idx });
    }

    const handleCardDetailClose = (idx) => {
        if (cardDialogueTitle) {
            List[id].card[idx].title = cardDialogueTitle;
            setcardDialogueTitle("");
        }
        setopenCard({ open: false, idx: null });
        setcardTitle("");
    }

    const addDesctoCard = (desc, idx) => {
        List[id].card[idx].description = desc;
        setcardList(List[id]);
    }

    return (
        <div>
            <Card sx={{ width: 250, padding: '10px', backgroundColor: '#ededed', marginRight: '1rem' }}>
                <div className={styles.head}><Input className={styles.input} value={listTitle} onChange={e => setlistTitle(e.target.value)} onBlur={listTitleChange} /> <span className={styles.IconContainer}><MoreHorizIcon /></span></div>
                {
                    cardList && TitleCard(cardList.card, handleCardClick)
                }
                <form onSubmit={handleSubmit} ref={formRef}>
                    {addCard && <TextArea className={styles.textArea} rows={3} placeholder="Enter a title for this card." value={cardTitle} onChange={handleChange} onKeyPress={submitOnEnter} autoFocus />}

                    <CardActions sx={{ padding: '0' }}>
                        {!addCard ?
                            (<Button className={styles.addButton} onClick={() => setaddCard(true)}  >
                                <span className={styles.buttonTitle}> <AddIcon className={styles.icon} />  Add a Card </span>
                            </Button>
                            ) :
                            (<div className={styles.actionContainer}>
                                <Button variant="contained" type="submit" >Add Card</Button>
                                <CloseIcon sx={{ fontSize: 30, color: '#6b778c', marginLeft: '5px', cursor: 'pointer' }} onClick={closeaddCard} />
                            </div>
                            )
                        }
                    </CardActions>
                </form>
            </Card>
            {openCard.open && <DetailCardDialogue opendet={openCard} cardData={currentCard} handleClose={() => handleCardDetailClose(openCard.idx)} handleChange={e => setcardDialogueTitle(e.target.value)} title={cardDialogueTitle} addDesctoCard={addDesctoCard} />}
        </div>
    );
};

export default BoardList;
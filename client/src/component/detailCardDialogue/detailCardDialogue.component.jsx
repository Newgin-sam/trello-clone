import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogueTitle from '../dialogueTitle/dialogueTitle.component';
import CloseIcon from '@mui/icons-material/Close';
import ReorderIcon from '@mui/icons-material/Reorder';

import styles from './detailCardDialogue.module.scss';

const DetailCardDialogue = ({ opendet, cardData, handleClose, title, settitle, handleSubmit, handleChange, addDesctoCard }) => {
    const [addDesc, setaddDesc] = useState(false);
    const [desc, setdesc] = useState("");

    useEffect(() => {
        cardData && setdesc(cardData.description)
        console.log(cardData)
    }, [cardData])

    const { TextArea } = Input;

    const closedesc = () => {
        setaddDesc(false);
        if (cardData.description) {
            setdesc(cardData.description);
        } else {
            setdesc("");
        }
    }

    const submitOnEnter = e => {
        if (e.which === 13) {
            handleDescSubmit(e);
        }
    }

    const handleDialogueClose = () => {
        setaddDesc(false);
        setdesc("");
        handleClose();
    }

    const handleDescSubmit = e => {
        console.log("hello");
        e.preventDefault();
        addDesctoCard(desc, opendet.idx)
        setaddDesc(false);
    }

    return (
        <Dialog className=""
            onClose={handleDialogueClose}
            fullWidth
            maxWidth="md"
            aria-labelledby="customized-dialog-title"
            open={opendet.open}
        >
            <div className={styles.dialogueContainer}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.dialogueContent}>
                        <DialogueTitle id="customized-dialog-title" onClose={handleDialogueClose} dark="true" >
                            <Input className={styles.input} value={title} onChange={handleChange} placeholder="Add Board Title" />
                        </DialogueTitle>
                        <DialogContent >
                            <div className={styles.headingContainer}>
                                <ReorderIcon className={styles.marginRight} />
                                <h3 className={styles.marginRight}>
                                    Description
                                </h3>
                                {desc && <span className={styles.tag} onClick={() => setaddDesc(true)}> Edit </span>}

                            </div>
                            <div className={styles.descContainer}>
                                {!addDesc ?
                                    (desc ? <span onClick={() => setaddDesc(true)} >{desc}</span> : <Button className={styles.addButton} onClick={() => setaddDesc(true)}  >
                                        <span className={styles.buttonTitle}> Add a more detailed description.... </span>
                                    </Button>
                                    ) :
                                    (<div className={styles.actionContainer}>
                                        <form onSubmit={handleDescSubmit} className={styles.descForm} >
                                            <TextArea className={styles.textArea} rows={3} placeholder="Enter a title for this card." value={desc} onChange={e => setdesc(e.target.value)} onKeyPress={submitOnEnter} autoFocus />
                                            <div className={styles.actionButton}>
                                                <Button variant="contained" onClick={handleDescSubmit} >save</Button>
                                                <CloseIcon sx={{ fontSize: 30, color: '#6b778c', marginLeft: '5px', cursor: 'pointer' }} onClick={closedesc} />
                                            </div>
                                        </form>
                                    </div>
                                    )
                                }
                            </div>
                        </DialogContent>
                    </div>
                </form>
            </div>
        </Dialog>
    );
};

export default DetailCardDialogue;
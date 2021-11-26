import React from 'react';

import { Link } from "react-router-dom";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import styles from './boardCard.module.scss';

const BoardCard = ({ id, title }) => {
    return (
        <div className={styles.cardContainer}>
            <Link to={`/board/${id}`} className={styles.link} >
                <Card sx={{ minWidth: 200, minHeight: 100 }}  >
                    <CardContent sx={{ backgroundColor: 'grey' }}>
                        <Typography sx={{ fontSize: 16, fontWeight: 800 }} color="text.secondary" gutterBottom>
                            {title}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </div>
    );
};

export default BoardCard;
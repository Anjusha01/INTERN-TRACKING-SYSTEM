import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const CardComp = ({ cardImg, cardTitle, cardText, textClass, imgClass, titleClass, truncateText }) => {
    return (
        <Card style={{ width: '15rem' }} className='m-2 shadow-lg border-0 rounded-0'>
            <Card.Img variant="top" src={cardImg} alt='img' className={imgClass} />
            <Card.Body>
                <Card.Title className={titleClass}>{cardTitle}</Card.Title>
                <Card.Text className={textClass}>
                    {truncateText ? (
                        <>
                            {cardText.substring(0, 50)}
                            {cardText.length > 50 && '...'}
                            {cardText.length > 50 && (
                                <span>
                                    <Link to='/courseDetails'>Read More</Link>
                                </span>
                            )}
                        </>
                    ) : (
                        cardText
                    )}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CardComp;

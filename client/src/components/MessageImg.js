import React from 'react';

const MessageImg = ({img}) => {
    return (
        <div style={{maxWidth: '50vw', maxHeight: '20vh'}}>
            {!img ?
                null
            :
                <div style={{backgroundImage: `url(${process.env.REACT_APP_BASE_URL + img})`}}/>
            }
        </div>
    );
};

export default MessageImg;
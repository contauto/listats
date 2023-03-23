import React from 'react';

function ArtistCard(props) {
    return (
        <div className="col-3 mt-5">
            <img height={props.height} width={props.width}
                 src={props.items[props.id].images[1].url}
                 className="card-img-top"
                 alt="artist"
            />
            <div className="card-body">
                <h6 className="card-title text-center mt-1">{`${props.id + 1}. ${
                    props.items[props.id].name
                }`}</h6>
            </div>
        </div>
    );
}

export default ArtistCard;
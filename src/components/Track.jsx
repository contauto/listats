import React from 'react';

function Track(props) {
    const {artists}=props.item
    return (
        <div key={props.id + 50}>
                        <span className="bold" key={props.id + 100}>
                          {props.id + 1 < 10 ? "0" + (props.id + 1) : props.id + 1}
                        </span>
            <img
                key={props.id + 150}
                src={props.item.album.images[1].url}
                className="img-thumbnail m-2 p-0"
                alt="album-cover"
                height={props.height}
                width={props.width}
            ></img>
            <span className="bold" key={props.id + 200}>
                          {props.width < 1000
                              ? props.item.name.slice(0, 60)
                              : props.item.name}
                        </span>

            <q className="bold float-end mt-4" key={props.id + 250}>
                {artists[0].name}
            </q>
            <br/>
        </div>
    );
}

export default Track;
import React from "react";
import TimeFormatter from "../functions/TimeFormatter";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function LastTracks(props) {
  const { played_at } = props.item;
  const { artists } = props.item.track;
  const time = TimeFormatter(played_at);

  return (
    <div key={props.id + 50}>
      <span className="bold" key={props.id + 100}>
        {props.id + 1 < 10 ? "0" + (props.id + 1) : props.id + 1}
      </span>
      <img
        key={props.id + 150}
        src={props.item.track.album.images[1].url}
        className="img-thumbnail m-2 p-0"
        alt="album-cover"
        height={80}
        width={80}
      ></img>

      <span
        className="bold text-center justify-content-center mt-4"
        key={props.id + 500}
      >
        {artists[0].name}-
      </span>

      <span className="bold" key={props.id + 200}>
        {props.width < 1000
          ? props.item.track.name.slice(0, 38)
          : props.item.track.name}
      </span>

      <span className="bold float-end mt-4" key={props.id + 250}>
        <CalendarTodayIcon className="ms-1" />
        {time[0]}
        <AccessTimeIcon className="ms-1" />
        {time[1]}
      </span>
      <br />
    </div>
  );
}

export default LastTracks;

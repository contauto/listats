import React from "react";
import ArtistCard from "./ArtistCard";

export const Card = (props) => {
  const { items,screenSize } = props;

  const height=screenSize[0]>1000?320:156
  const width=screenSize[0]>1000?320:100
  return items.map((item, id) => {
    if(id%4!==0)return null
    return (
        <div key={id} className="row">
          {items[id]&&<ArtistCard height={height} width={width} items={items} id={id}/>
          }
          {items[id+1]&&<ArtistCard height={height} width={width} items={items} id={id+1}/>
          }
          {items[id+2]&&<ArtistCard height={height} width={width} items={items} id={id+2}/>
          }
          {items[id+3]&&<ArtistCard height={height} width={width} items={items} id={id+3}/>
          }
        </div>
    );
  });
};

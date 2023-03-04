import React from "react";

export const Card = (props) => {
  const { items,screenSize } = props;

  const size=screenSize[0]>1000?320:100
  return items.map((item, id) => {
    if(id%4!==0)return null
    return (
      <React.Fragment key={id}>
        <div className="row">
          {items[id]&&
            <div className="col-3 mt-5">
              <img height={size} width={size}
                src={items[id].images[1].url}
                className="card-img-top"
                alt="artist"
              />
              <div className="card-body">
                <h6 className="card-title text-center mt-1">{`${id + 1}. ${
                  items[id].name
                }`}</h6>
              </div>
            </div>
          }
          {items[id+1]&&
            <div className="col-3 mt-5">
              <img height={size} width={size}
                src={items[id+1].images[1].url}
                className="card-img-top"
                alt="artist"
              />
              <div className="card-body">
                <h6 className="card-title text-center mt-1">{`${id + 2}. ${
                  items[id+1].name
                }`}</h6>
              </div>
            </div>
          }
          {items[id+2]&&
            <div className="col-3 mt-5">
              <img height={size} width={size}
                src={items[id+2].images[1].url}
                className="card-img-top"
                alt="artist"
              />
              <div className="card-body">
                <h6 className="card-title text-center mt-1">{`${id + 3}. ${
                  items[id+2].name
                }`}</h6>
              </div>
            </div>
          }
          {items[id+3]&&
            <div className="col-3 mt-5">
              <img height={size} width={size}
                src={items[id+3].images[1].url}
                className="card-img-top"
                alt="artist"
              />
              <div className="card-body">
                <h6 className="card-title text-center mt-1">{`${id + 4}. ${
                  items[id+3].name
                }`}</h6>
              </div>
            </div>
          }
        </div>
      </React.Fragment>
    );
  });
};

import React, { useContext } from "react";
import Item from "./Item";
import "./renderItem.css";
import { AuthContext } from "../context/auth";
import { Fade } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Items = (props) => {
  const { wishlist } = useContext(AuthContext);
  return (
    <React.Fragment>
      <Fade in={true}>
        <div>
          <ul>
            {props.items.map((item) => {
              const wish = wishlist.find((i) => i === item._id) ? true : false;
              return (
                <Item
                  wishlist={wish}
                  key={item._id}
                  id={item._id}
                  creator={item.creator}
                  image={item.image}
                  show={props.show}
                  name={item.title}
                  lprice={item.lPrice}
                  hprice={item.hPrice}
                />
              );
            })}
          </ul>
        </div>
      </Fade>
    </React.Fragment>
  );
};

export default Items;

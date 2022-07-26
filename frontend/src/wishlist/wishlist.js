import React, { useContext } from "react";
import Item from "../Item/Item";
import Fallback from "../Fallback/fallbackPage";
import "./wishlist.css";
import { AuthContext } from "../context/auth";
import { Fade } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Items = (props) => {
  const { wishlist } = useContext(AuthContext);
  return (
    <React.Fragment>
      <Fade in={true}>
        <div className="Header">
            <h1>Wishlist</h1>
        {wishlist.length === 0 && <Fallback />}  
          <ul>
            {props.items.map((item) => {
              const wish = wishlist.find((i) => i === item.id) ? true : false;
              console.log(item);
              if (wish) {
                return (
                  <Item
                    wishlist={wish}
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    name={item.title}
                    lprice={item.lPrice}
                    hprice={item.hPrice}
                  />
                );
              }
              return <div />;
            })}
          </ul>
        </div>
      </Fade>
    </React.Fragment>
  );
};

export default Items;

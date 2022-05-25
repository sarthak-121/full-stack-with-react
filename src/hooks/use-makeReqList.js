import React from "react";
import List from "../component/requests/lists/list";
import Button from "../component/UI/req-button/button";
import Aux from "../hoc/Auxillary";

const useMakeReqList = (list, bin) => {
  let counter = 0;
  const generatedList = (
    <div>
      {list.map((item) => {
        counter += 1;
        let children = null;
        if (bin) {
          children = <Button name={"Decline"} user={item} />;
        } else {
          children = (
            <div style={{ display: "flex", gap: "20px" }}>
              <Button name={"Decline"} user={item} />
              <Button name={"Accept"} user={item} />
            </div>
          );
        }
        return (
          <List name={item} key={counter}>
            {children}
          </List>
        );
      })}
    </div>
  );

  return generatedList;
};

export default useMakeReqList;

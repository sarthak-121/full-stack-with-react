import React from "react";

import { useSelector } from "react-redux";
import List from "../component/sidebar/list/list";

const useMakePropleList = (peopleList, sendRequest) => {
  const connRequestSent = useSelector((state) => state.sended);
  const username = useSelector((state) => state.credential.username);
  const friends = useSelector((state) => state.friends);
  let counter = 0;

  let renderedPeopleList = (
    <div>
      {peopleList.map((people) => {
        counter += 1;
        if (people === username) {
          return null;
        }

        if (connRequestSent.includes(people)) {
          return null;
        }

        let isPresent = false;
        friends.forEach((friend) => {
          if (friend.name === people) {
            isPresent = true;
            return;
          }
        });

        if (isPresent) {
          return null;
        }

        const target = peopleList.indexOf(people);

        if (people.length > 23) {
          people = people.slice(0, 20) + "...";
        }

        return (
          <List
            name={people}
            click={() => sendRequest(target)}
            bin={true}
            key={counter}
          />
        );
      })}
    </div>
  );

  const filteredList = renderedPeopleList.props.children.filter(
    (el) => el != null
  );

  if (filteredList.length === 0) {
    return false;
  } else {
    return renderedPeopleList;
  }
};

export default useMakePropleList;

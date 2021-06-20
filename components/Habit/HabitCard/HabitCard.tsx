import React from "react";
import { Card, Avatar } from "antd";
import { HabitCardProps } from "./HabitCard.types";
import Meta from "antd/lib/card/Meta";
import { DIFFICULTY_ID, EASY_ICON, MEDIUM_ICON, HARD_ICON } from "./constant";
import classes from "./HabitCard.module.css";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";

const HabitCard = ({ habit }: HabitCardProps) => {
  const cardClickHandler = () => console.log(habit);

  const hitButtonClickHandler = () => console.log("hit");

  const difficultyAvatar = () => {
    switch (habit.difficultyId) {
      case DIFFICULTY_ID.EASY:
        return EASY_ICON;
      case DIFFICULTY_ID.MEDIUM:
        return MEDIUM_ICON;
      case DIFFICULTY_ID.HARD:
        return HARD_ICON;
    }
  };
  return (
    <div className={classes.cardContainer}>
      <Card
        hoverable
        onClick={cardClickHandler}
        title={habit.taskTitle}
        className={classes.card}
      >
        <Meta
          avatar={<Avatar src={difficultyAvatar()} />}
          description={habit.notes}
        />
      </Card>
      <div className={classes.hitButton}>
        <SimpleButton type="text" onClick={hitButtonClickHandler}>
          HIT
        </SimpleButton>
      </div>
    </div>
  );
};

export default HabitCard;

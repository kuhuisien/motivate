import React from "react";
import { Card, Avatar } from "antd";
import { HabitCardProps } from "./HabitCard.types";
import Meta from "antd/lib/card/Meta";
import classes from "./HabitCard.module.css";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import { useRouter } from "next/router";
import { PATHS } from "lib/nav/routes";

const HabitCard = ({
  habit,
  difficultySettings,
  setSelectedHabit,
}: HabitCardProps) => {
  const router = useRouter();

  const cardClickHandler = () => {
    setSelectedHabit(habit);
    router.push(PATHS.HABIT_EDIT.path);
  };

  const hitButtonClickHandler = () => {};

  const difficultyAvatar = () => {
    return difficultySettings.find((d) => d.code === habit.difficultyId)?.image;
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

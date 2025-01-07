import React from "react";
import { Card, Avatar } from "antd";
import { HabitCardProps } from "./HabitCard.types";
import Meta from "antd/lib/card/Meta";
import classes from "./HabitCard.module.css";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import { useRouter } from "next/router";
import { ID_PLACEHOLDER, PATHS } from "lib/nav/routes";
import { notification } from "antd";

const MESSAGES = [
  "You did it! 🎉",
  "You’re unstoppable! 🚀",
  "Goal Unlocked! 🔓",
  "You’re on fire! 🔥",
  "High five! 🖐️",
];

const HabitCard = ({ habit, difficultySettings }: HabitCardProps) => {
  const router = useRouter();

  const cardClickHandler = () => {
    const path = PATHS.HABIT_EDIT.path.replace(ID_PLACEHOLDER, habit.id);
    router.push(path);
  };

  const difficultySetting = difficultySettings.find(
    (d) => d.code === habit.difficultyId
  );

  const difficultyAvatar = difficultySetting?.image;

  // callback invoked when habit card button is clicked
  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * MESSAGES.length);
    const notificationMsg = MESSAGES[randomIndex];

    notification.open({
      message: notificationMsg,
      placement: "bottomRight",
      duration: 2,
    });
  };

  return (
    <div className={classes.cardContainer}>
      <Card hoverable onClick={cardClickHandler} title={habit.taskTitle}>
        <Meta
          avatar={<Avatar src={difficultyAvatar} />}
          description={habit.notes}
        />
      </Card>
      <div className={classes.hitButton}>
        <SimpleButton type="text" onClick={handleClick}>
          Crush It
        </SimpleButton>
      </div>
    </div>
  );
};

export default HabitCard;

import React from "react";
import { Card, Avatar } from "antd";
import { HabitCardProps } from "./HabitCard.types";
import Meta from "antd/lib/card/Meta";
import classes from "./HabitCard.module.css";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import { useRouter } from "next/router";
import { ID_PARAM, PATHS } from "lib/nav/routes";

const HabitCard = ({
  habit,
  difficultySettings,
  handleClick,
}: HabitCardProps) => {
  const router = useRouter();

  const cardClickHandler = () => {
    const path = PATHS.HABIT_EDIT.path.replace(`:${ID_PARAM}`, habit.id);
    router.push(path);
  };

  const difficultySetting = difficultySettings.find(
    (d) => d.code === habit.difficultyId
  );

  const difficultyAvatar = difficultySetting?.image;

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

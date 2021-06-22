import React from "react";
import { HabitFormFieldProps } from "./HabitFormField.types";
import { RadioType } from "components/FormInputs/RadioButton/RadioButton.types";
import {
  DIFFICULTY_ID,
  EASY_ICON,
  MEDIUM_ICON,
  HARD_ICON,
} from "../HabitCard/constant";
import classes from "./HabitFormField.module.css";
import Image from "next/image";
import { Typography } from "antd";
import TextField from "components/FormInputs/TextField/TextField";
import RadioButton from "components/FormInputs/RadioButton/RadioButton";
import TextArea from "components/FormInputs/TextArea/Textarea";

const RADIO_BUTTON_ICON_SIZE = 50;

const formFieldNames = {
  taskTitle: "taskTitle",
  notes: "notes",
  difficulty: "difficulty",
};

const taskNature: RadioType[] = [
  {
    id: DIFFICULTY_ID.EASY,
    body: (
      <div className={classes.difficulty}>
        <Image
          src={EASY_ICON}
          alt={DIFFICULTY_ID.EASY}
          width={RADIO_BUTTON_ICON_SIZE}
          height={RADIO_BUTTON_ICON_SIZE}
        />
        <Typography.Text className={classes.difficultyText}>
          EASY
        </Typography.Text>
      </div>
    ),
  },
  {
    id: DIFFICULTY_ID.MEDIUM,
    body: (
      <div className={classes.difficulty}>
        <Image
          src={MEDIUM_ICON}
          alt={DIFFICULTY_ID.MEDIUM}
          width={RADIO_BUTTON_ICON_SIZE}
          height={RADIO_BUTTON_ICON_SIZE}
        />
        <Typography.Text className={classes.difficultyText}>
          MEDIUM
        </Typography.Text>
      </div>
    ),
  },
  {
    id: DIFFICULTY_ID.HARD,
    body: (
      <div className={classes.difficulty}>
        <Image
          src={HARD_ICON}
          alt={DIFFICULTY_ID.HARD}
          width={RADIO_BUTTON_ICON_SIZE}
          height={RADIO_BUTTON_ICON_SIZE}
        />
        <Typography.Text className={classes.difficultyText}>
          HARD
        </Typography.Text>
      </div>
    ),
  },
];

const HabitFormField = ({ habitState }: HabitFormFieldProps) => {
  return (
    <>
      <TextField
        name={formFieldNames.taskTitle}
        defaultValue={habitState?.taskTitle}
        placeholder="Task Title"
      ></TextField>

      <TextArea
        name={formFieldNames.notes}
        defaultValue={habitState?.notes}
        rows={3}
        placeholder="Notes"
      ></TextArea>

      <RadioButton
        name={formFieldNames.difficulty}
        values={taskNature}
        defaultValue={habitState?.difficultyId || taskNature[0].id}
      ></RadioButton>
    </>
  );
};

export default HabitFormField;

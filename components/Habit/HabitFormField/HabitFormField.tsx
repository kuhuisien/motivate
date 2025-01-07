import { HabitFormFieldProps } from "./HabitFormField.types";
import { RadioType } from "components/FormInputs/RadioButton/RadioButton.types";
import classes from "./HabitFormField.module.css";
import Image from "next/image";
import { Typography } from "antd";
import TextField from "components/FormInputs/TextField/TextField";
import RadioButton from "components/FormInputs/RadioButton/RadioButton";
import TextArea from "components/FormInputs/TextArea/Textarea";
import CustomTagging from "./CustomTagging/CustomTagging";

const RADIO_BUTTON_ICON_SIZE = 50;

export const formFieldNames = {
  taskTitle: "taskTitle",
  notes: "notes",
  difficulty: "difficulty",
};

const HabitFormField = ({
  habitState,
  difficultySettings,
  tags,
  setTags,
}: HabitFormFieldProps) => {
  const difficultyLvlSelectionList = difficultySettings.map((d) => {
    return {
      id: d.code,
      body: (
        <div className={classes.difficulty}>
          <Image
            src={d.image || ""}
            alt={d.code || ""}
            width={RADIO_BUTTON_ICON_SIZE}
            height={RADIO_BUTTON_ICON_SIZE}
          />
          <Typography.Text className={classes.difficultyText}>
            {d.displayValue}
          </Typography.Text>
        </div>
      ),
    } as RadioType;
  });

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
        values={difficultyLvlSelectionList}
        defaultValue={
          habitState?.difficultyId || difficultyLvlSelectionList?.[0]?.id
        }
      ></RadioButton>

      <CustomTagging tags={tags} setTags={setTags} />
    </>
  );
};

export default HabitFormField;

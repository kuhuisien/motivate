import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import { setSelectedHabit } from "lib/redux/habit";
import HabitCard from "./HabitCard";
import { HabitType } from "lib/types/habit.types";
import { RootState } from "lib/redux/root/redux.types";

const mapStateToProps = (state: RootState) => {
  return {
    difficultySettings: state.systemSetting.difficultySettings,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    setSelectedHabit: (habit: HabitType) => {
      dispatch(setSelectedHabit(habit));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HabitCard);

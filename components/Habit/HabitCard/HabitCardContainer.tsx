import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import { setSelectedHabit } from "lib/redux/habit";
import { HabitType } from "./HabitCard.types";
import HabitCard from "./HabitCard";

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    setSelectedHabit: (habit: HabitType) => {
      dispatch(setSelectedHabit(habit));
    },
  };
};

export default connect(null, mapDispatchToProps)(HabitCard);

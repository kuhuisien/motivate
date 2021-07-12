import { connect } from "react-redux";
import { RootState } from "lib/redux/root/redux.types";
import HabitFormField from "./HabitFormField";

const mapStateToProps = (state: RootState) => {
  return {
    difficultySettings: state.systemSetting.difficultySettings,
  };
};

export default connect(mapStateToProps)(HabitFormField);

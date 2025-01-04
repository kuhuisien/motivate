import { connect } from "react-redux";
import HabitCard from "./HabitCard";
import { RootState } from "lib/redux/root/redux.types";

const mapStateToProps = (state: RootState) => {
  return {
    difficultySettings: state.systemSetting.difficultySettings,
  };
};

export default connect(mapStateToProps)(HabitCard);

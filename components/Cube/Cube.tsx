import classes from "./Cube.module.css";

const Cube = () => {
  return (
    <div className={classes.cubeContainer}>
      <div className={classes.cube}>
        <div className={classes.cubeFace + " " + classes.front}></div>
        <div className={classes.cubeFace + " " + classes.back}></div>
        <div className={classes.cubeFace + " " + classes.left}></div>
        <div className={classes.cubeFace + " " + classes.right}></div>
        <div className={classes.cubeFace + " " + classes.top}></div>
        <div className={classes.cubeFace + " " + classes.bottom}></div>
      </div>
    </div>
  );
};

export default Cube;

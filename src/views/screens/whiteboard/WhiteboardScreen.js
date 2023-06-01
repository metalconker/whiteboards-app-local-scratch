// Imports React and the necessary supporting components from Material-UI

import React from "react";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import BackgroundImage from "../../../assets/images/whiteboard/Whiteboard.png";
import Album from "./WhiteboardScreenExercise";
import PropTypes from "prop-types";
import * as Schedule from "../../../controller/schedule/Schedule";
import * as ConstantsSchedule from "../../../controller/schedule/ConstantsSchedule";

import { Typography, Button, Box } from "@mui/material";

// import WhiteboardBlankModalContainer from './WhiteboardBlankModalContainer';
// import ExerciseBoardModalContents from './ExerciseBoardModalContents';

// Exports the WhiteboardScreen class to be used elsewhere
export default class WhiteboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.day = this.props.day;
    this.week = this.props.week;
  }

  render() {
    // Renders the board to the screen
    return (
      <Paper elevation={0} square sx={STYLES.WHITEBOARD_BACKGROUND}>
        {/* {this.props.grid} */}
        <SplitScreen day={this.day} schedule={this.schedulename}></SplitScreen>

        {/* <WhiteboardScreenExerciseMainContainer schedulename={this.schedulename}> 

        </WhiteboardScreenExerciseMainContainer> */}
        {/* <WhiteboardErasableText textColor={"red"}>{this.schedulename}</WhiteboardErasableText> */}
      </Paper>
    );
  }
}

export function SplitScreen(props) {
  return (
    <Box sx={STYLES.SPLIT_SCREEN.root}>
      <Box sx={STYLES.SPLIT_SCREEN.red}>
        <TopComponent day={props.day} schedule={props.schedule}></TopComponent>
      </Box>
      <Box sx={STYLES.SPLIT_SCREEN.blue}></Box>
    </Box>
  );
}

export function TopComponent(props) {
  return (
    <Box sx={STYLES.TOP_COMPONENT.container}>
      <Typography variant="h6" color="textPrimary">
        {props.day} : {props.schedule}
      </Typography>
    </Box>
  );
}

// export function WhiteboardScreenExerciseMainContainer(props) {
//   // const classes = useStyles();
//   const [scheduleData, setScheduleData] = useState(null);
//   const [maxsets, setMaxSets] = useState(0);
//   const [metaidkeys, setMetaIdKeys] = useState([]);

//   useEffect(() => {
//     const scheduleData = new Schedule.ScheduleData(props.schedulename);
//     const maxSets = scheduleData.GetMaxSets();
//     const metaIdKeys = scheduleData.GetMetadataKeys();
//     setScheduleData(scheduleData);
//     setMaxSets(maxSets);
//     setMetaIdKeys(metaIdKeys);
//   }, [props.schedulename]);

//   if (!scheduleData) {
//     return null;
//   }

//   return (
//     <Box>
//       {/* <ExerciseBoardHeaderLine maxsets={maxsets} />
//       {metaidkeys.map((metaid) => {
//         const exercisedata = scheduleData.GetExerciseData(metaid);
//         return (
//           <ExerciseBoardDataLine
//             key={metaid}
//             metaid={metaid}
//             exercisedata={exercisedata}
//             maxsets={maxsets}
//           />
//         );
//       })} */}
//     </Box>
//   );
// }

export function WhiteboardErasableText({ children, textColor }) {
  const [textValue, setTextValue] = useState(children);

  const onPress = () => {
    setTextValue("");
  };

  return (
    <Box sx={{ display: "inline-flex", alignItems: "center" }}>
      <Button variant="contained" onClick={onPress} sx={{ mr: 1 }}>
        <Typography
          variant="h2"
          fontFamily="Whiteboard"
          fontSize={35}
          color={textColor}
        >
          {textValue}
        </Typography>
      </Button>
      {/* <Typography
        variant="h2"
        fontFamily="Whiteboard"
        fontSize={35}
        color={textColor}
      >
        {textValue}
      </Typography> */}
    </Box>
  );
}

// export function ExerciseBoardDataLine(props) {
//   const classes = useStyles();
//   const [setsData, setSetsData] = useState(getSetsData());

//   const name = `   ${props.exercisedata.Name()}`;

//   function getSetsData() {
//     const temp = [];
//     for (let i = 0; i < props.maxsets; i++) {
//       if (i < props.exercisedata.NumSets()) {
//         temp.push({
//           color: getSetColor(i),
//           dataString: getDataString(),
//         });
//       } else {
//         temp.push(null);
//       }
//     }
//     return temp;
//   }

//   function getDataString() {
//     const exercisedata = props.exercisedata;
//     if (exercisedata.IsTimeBased()) return `${exercisedata.Time()}secs`;
//     return `${exercisedata.NumReps()}reps`;
//   }

//   function getSetColor(index) {
//     const alternating = props.exercisedata.IsAlternating();
//     if (!alternating) return props.defaultcolor;
//     return index % 2 === 0 ? props.leftcolor : props.rightcolor;
//   }

//   return (
//     <Box className={classes.line}>
//       <WhiteboardBlankModalContainer text={name}>
//         <ExerciseBoardModalContents metaid={props.metaid} />
//       </WhiteboardBlankModalContainer>
//       {setsData.map((setData, index) => (
//         <Box key={index} className={classes.sets}>
//           {setData ? (
//             <WhiteboardErasableText textColor={setData.color}>
//               {setData.dataString}
//             </WhiteboardErasableText>
//           ) : null}
//         </Box>
//       ))}
//     </Box>
//   );
// }

// Defines the styling variables for this component
const STYLES = {
  WHITEBOARD_BACKGROUND: {
    backgroundImage: `url(${BackgroundImage})`,
    position: "fixed",
    height: "100vh",
    minWidth: "100%",
    minHeight: "100%",
    backgroundSize: "100vw 100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },

  SPLIT_SCREEN: {
    root: {
      width: "100%",
      height: "100vh",
      minWidth: "100%",
      minHeight: "100%",
    },
    red: {
      backgroundColor: "red",
      height: "calc(100vh / 7)",
      width: "100%",
    },
    blue: {
      backgroundColor: "blue",
      height: "calc((6 * 100vh) / 7)",
      width: "100%",
    },
  },

  TOP_COMPONENT: {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    },
  },
};

// const useStyles = makeStyles((theme) => ({
//   line: {
//     display: 'flex',
//     alignItems: 'center',
//   },
//   sets: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//   },
// }));

// WhiteboardScreenBackground.propTypes = {
//   grid: PropTypes.object.isRequired,
// };

// WhiteboardScreenBackground.defaultProps = {
//   grid: [],
// };

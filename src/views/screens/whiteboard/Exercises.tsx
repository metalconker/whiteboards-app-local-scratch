import * as React from "react";
import * as Schedule from "../../../controller/schedule/Schedule";
import * as ConstantsSchedule from "../../../controller/schedule/ConstantsSchedule";
import { Typography, Button, Box, Grid, ThemeProvider } from "@mui/material";
import {
  WhiteboardClickableText,
  WhiteboardDefaultText,
  WhiteboardErasableText,
} from "./Typography";
import { WhiteboardScreenBackground } from "./Template";
import * as Exercises from "../../../controller/exercises/Exercises";
import { TEXT_STYLES, EXERCISE_BOARD_STYLES, theme } from "./Styles";

export default class ExerciseBoardScreen extends React.Component {
  scheduleName: string;
  scheduleData: Schedule.ScheduleData;
  day: string;
  week: number;
  maxSets: number;
  metaIDKeys: any[];

  constructor(props: any) {
    super(props);
    this.day = props.day;
    this.week = props.week;
    this.scheduleName = Schedule.getScheduleNameDWT(
      this.day,
      this.week,
      Object.keys(ConstantsSchedule.EXERCISE_TYPE)[0]
    );
    this.scheduleData = new Schedule.ScheduleData(this.scheduleName);
    this.maxSets = this.scheduleData.getMaxSets();
    this.metaIDKeys = this.scheduleData.getMetadataKeys();
  }

  render() {
    // Renders the board to the screen
    return (
      <ThemeProvider theme={theme}>
        <WhiteboardScreenBackground>
          <Box sx={EXERCISE_BOARD_STYLES.SPLIT_SCREEN.root}>
            <Box sx={EXERCISE_BOARD_STYLES.SPLIT_SCREEN.top}>
              <ExTitle day={this.day} name={this.scheduleName} />
            </Box>
            <Box sx={EXERCISE_BOARD_STYLES.SPLIT_SCREEN.bottom}>
              <ExSets maxSets={this.maxSets} />
              {this.metaIDKeys.map((i, index) => (
                <ExExercises
                  key={index}
                  index={index}
                  data={this.scheduleData}
                  maxSets={this.maxSets}
                />
              ))}
            </Box>
          </Box>
        </WhiteboardScreenBackground>
      </ThemeProvider>
    );
  }
}

export const ExTitle = ({ day, name }: { day: string; name: string }) => {
  return (
    <Box sx={EXERCISE_BOARD_STYLES.TOP_COMPONENT.container}>
      {/* <Typography sx={TEXT_STYLES.TITLE}> */}
      <Typography variant="h3">
        {day} : {name}
      </Typography>
    </Box>
  );
};

export const ExSets = ({ maxSets }: { maxSets: number }) => {
  return (
    <Grid container spacing={2} columns={maxSets * 2}>
      {[...Array(maxSets)].map((_, index) => {
        if (index == 0) {
          return <Grid key={index} item xs={maxSets}></Grid>;
        } else {
          return (
            <Grid key={index} item xs={1}>
              <WhiteboardDefaultText key={index}>
                Set {index}
              </WhiteboardDefaultText>
            </Grid>
          );
        }
      })}
    </Grid>
  );
};

export const ExExercises = ({
  data,
  index,
  maxSets,
}: {
  data: Schedule.ScheduleData;
  index: number;
  maxSets: number;
}) => {
  const exerciseData = data.getExerciseData(data.getMetadataKeys()[index]);
  const media = Exercises.GetMedia(data.getMetadataKeys()[index]);
  const mediaType = Exercises.GetMediaType(data.getMetadataKeys()[index]);

  return (
    <Grid container spacing={2} columns={maxSets * 2}>
      {[...Array(maxSets)].map((_, index) => {
        if (index == 0) {
          return (
            <Grid key={index} item xs={maxSets}>
              <WhiteboardClickableText
                uri={media}
                readableName={exerciseData.getName()}
                mediaType={mediaType}
              />
            </Grid>
          );
        } else {
          return (
            <Grid key={index} item xs={1}>
              <WhiteboardErasableText key={index}>
                Rep {index}
              </WhiteboardErasableText>
            </Grid>
          );
        }
      })}
    </Grid>
  );
};

// export class ExerciseBoardDataLine extends React.Component {
//   constructor(props) {
//     super(props);
//     this.exercisedata = new Schedule(props.exercisedata);
//     this.name = "   " + this.exercisedata.Name();
//   }

//   renderSets = () => {
//     let temp = [];
//     for (var i = 0; i < props.maxsets; i++) {
//       if (i < this.exercisedata.NumSets()) {
//         temp.push(
//           <Box sx={styles.sets} key={i}>
//             <WhiteboardErasableText textColor={getcolor(i)}>
//               {getdatastring()}
//             </WhiteboardErasableText>
//           </Box>
//         );
//       } else {
//         temp.push(<Box sx={styles.sets} key={i} />);
//       }
//     }
//     return temp;
//   };

//   getdatastring = () => {
//     let exercisedata = this.exercisedata;
//     if (exercisedata.IsTimeBased()) return exercisedata.Time() + "secs";
//     return exercisedata.NumReps() + "reps";
//   };

//   getcolor = (index) => {
//     let alternating = this.exercisedata.IsAlternating();
//     if (!alternating) return props.defaultcolor;
//     if (index % 2 == 0) return props.leftcolor;
//     return props.rightcolor;
//   };

//   render() {
//     return (
//       <Box sx={styles.line} key={this.exercisedata.Name()}>
//         {/* <WhiteboardBlankModalContainer text={name}>
//         <ExerciseBoardModalContents metaid={props.metaid} />
//       </WhiteboardBlankModalContainer> */}
//         {renderSets()}
//       </Box>
//     );
//   }
// }

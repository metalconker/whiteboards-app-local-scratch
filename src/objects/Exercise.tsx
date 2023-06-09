import * as ExerciseModel from "../model/ExerciseModel";
import { checkGetter, checkSetter } from "../Helpers";
import Muscles from "./MusclesImages";

const name = "Exercise";

export default class Exercise {
  private _comments: string;
  private _execution: string;
  private _mediaType: string;
  private _metaID: string;
  private _muscles: Muscles;
  private _muscleInformation: {};
  private _preparation: string;
  private _uri: string;

  constructor(metaID: string) {
    this.metaID = metaID;
    this.comments = ExerciseModel.getComments(metaID);
    this.execution = ExerciseModel.getExecution(metaID);
    this.mediaType = ExerciseModel.getMediaType(metaID);
    this.preparation = ExerciseModel.getPreparation(metaID);
    this.uri = ExerciseModel.getMedia(metaID);
    this.muscleInformation = ExerciseModel.getMuscleInformation(metaID);
    this.muscles = new Muscles(this.muscleInformation);
  }

  public get comments(): string {
    return checkGetter(this._comments, "Comments", name);
  }
  private set comments(value: string) {
    this._comments = checkSetter(value, "Comments", name);
  }

  public get execution(): string {
    return checkGetter(this._execution, "Execution", name);
  }
  private set execution(value: string) {
    this._execution = checkSetter(value, "Execution", name);
  }

  public get mediaType(): string {
    return checkGetter(this._mediaType, "MediaType", name);
  }
  private set mediaType(value: string) {
    this._mediaType = checkSetter(value, "MediaType", name);
  }

  public get metaID(): string {
    return checkGetter(this._metaID, "MetaID", name);
  }
  private set metaID(value: string) {
    this._metaID = checkSetter(value, "MetaID", name);
  }

  public get muscleInformation(): {} {
    return checkGetter(this._muscleInformation, "muscleInformation", name);
  }
  private set muscleInformation(value: {}) {
    this._muscleInformation = checkSetter(value, "muscleInformation", name);
  }

  public get muscles(): Muscles {
    return checkGetter(this._muscles, "muscles", name);
  }
  private set muscles(value: Muscles) {
    this._muscles = checkSetter(value, "muscles", name);
  }

  public get preparation(): string {
    return checkGetter(this._preparation, "Preparation", name);
  }
  private set preparation(value: string) {
    this._preparation = checkSetter(value, "Preparation", name);
  }

  public get uri(): string {
    return checkGetter(this._uri, "Uri", name);
  }
  private set uri(value: string) {
    this._uri = checkSetter(value, "Uri", name);
  }
}

import { StudentModel } from './student.model';
import { JobModel } from './job.model';

export class MatchModel {

  constructor(
    public id: number,
    public student: StudentModel,
    public job: JobModel,
    public matchStrength: number,
    public tag: string,
    public studentProblemResponse: string,
    public studentPresentationLink: string,
    public studentPresentationLinks: any,
    public viewedSinceLastUpdate: boolean,
    public timeLastUpdated: any,
    public applicationStatus: string,
    public currentPhase: string
  ) {}

  public static createMatchFromApiData(apiData: any): MatchModel {
    return new MatchModel(
      apiData.id,
      StudentModel.createStudentFromApiData(apiData.student),
      JobModel.createJobFromApiData(apiData.job),
      apiData.matchStrength,
      apiData.tag,
      apiData.studentProblemResponse,
      apiData.studentPresentationLink,
      apiData.studentPresentationLinks,
      apiData.viewedSinceLastUpdate,
      apiData.timeLastUpdated,
      apiData.applicationStatus,
      apiData.currentPhase
    );
  }
}

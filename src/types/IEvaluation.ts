export interface IEvaluation {
  _id: string,
  __v?: number,
  evaluationName: string,
  evaluationItems: [{
    category: string, 
    criteria: string,
    weightage: number,
    _id: string
  }]
}
export class Config {
  public id: number;
  public propName: string;
  public propValue: string;
  public propPublic: boolean;
  public propProtected: boolean;
  public propDescription: string;

  constructor(propName: string, propValue: string, propPublic: boolean, propProtected: boolean, propDescription: string) {
    this.propName = propName
    this.propValue = propValue
    this.propPublic = propPublic
    this.propProtected = propProtected
    this.propDescription = propDescription
  }
}

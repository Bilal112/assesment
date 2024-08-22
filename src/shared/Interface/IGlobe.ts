interface IApplicationData {
  arabicName: String;
  englishName: String;
  defaultName: String;
  landingUrl: String;
  code: String;
  arabicDescription: String;
  englishDescription: String;
  defaultDescription: String;
  applicationStatus: Number;
  lookups: Array<Object>;
  theme: String;
  enableDarkMode: Boolean;
  image: String;
  id: String;
  createdBy: String;
  modifiedBy: String;
  modificationDate: String;
  creationDate: String;
  isDeleted: Boolean;
  deletionDate: null | string;
  deletedBy: null | string;
}

export {IApplicationData};

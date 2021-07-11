export enum UserRole {
  ADMIN = "admin",
  MODERATOR = "moderator",
  CONTRIBUTOR = "contributor",
  MEMBER = "member",
}

export enum NovelTypes {
  LIGHT_NOVEL = "Light Novel",
  PUBLISHED_NOVEL = "Published Novel",
  WEB_NOVEL = "Web Novel",
}

//probably will switch to a many to many relationship, not sure though
export enum Languages {
  ENGLISH = "English",
  CHINESE = "Chinese",
  FILIPINO = "Filipino",
  INDONESIAN = "Indonesian",
  JAPANESE = "Japanese",
  KOREAN = "Korean",
  MALAYSIAN = "Malaysian",
  THAI = "Thai",
  VIETNAMESE = "Vietnamese",
}

export enum Status {
  COMPLETED = "Completed",
  ONGOING = "Ongoing",
  HIATUS = "Hiatus",
  DROPPED = "Dropped",
}

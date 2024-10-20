export interface Users {
  UserType: String;
  Email: { type: String; required: true; unique: true };
  Password: { type: String; required: true };
}

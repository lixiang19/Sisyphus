type DateType = {
  objectId: string,
  date:BmobDate
}
type Pointer = {
  className: string;
  objectId: string;
}
type BaseBmobItem = {
  objectId: string;
  createdAt: string;
}

type Habit = {
  objectId: string,
  name: string,
  habits: string[],
}
type HabitOneDay = {
  dateId: string,
  level: number,
  habitDateId:string
}&Habit
type DateHabitRelation = {
  objectId: string,
  habitFk: Pointer,
  dateFk: Pointer,
  level: number,
}
type BmobDate = {
  __type: 'Date';
  iso: string;
}

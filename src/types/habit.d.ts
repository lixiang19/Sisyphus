type BmobDate = {
  __type: 'Date';
  iso: string;
}

type Pointer = {
  className: string;
  objectId: string;
}
type BaseBmobItem = {
  objectId: string;
  createdAt: string;
  updatedAt: string;
}

type Habit = {
  objectId: string,
  name: string,
  habits: string[],
}
type DateType = {
  objectId: string,
  date:BmobDate
}
type DateHabitRelation = {
  objectId: string,
  habitFk: Pointer,
  dateFk: Pointer,
  level: number,
}
type DateHabitRelationJoin = {
  objectId: string,
  habitFk: Pointer&Habit,
  dateFk: Pointer&DateType,
  level: number,
}&BaseBmobItem

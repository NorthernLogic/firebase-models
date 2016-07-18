# firebase-models

## WIP

## Example

```javascript
 const fitnessModel = new  FitnessClassModel("Yoga", "A Relaxing class");
fitnessService.save(fitnessModel);

const reservationModel = new  ReservationModel("3", "-KMxR_Ef6Dvp9AkMJ-xG");
reservationService.save(reservationModel);

const userModel = new UserModel("Adam Duren");
userService.save(userModel);

reservationService.list(["class", "user"])
  .subscribe(rl => console.log(rl));

  [ ReservationModel {
      userId: '-KMyfwVRhbGq8gpNKsaw',
      classId: '-KMxmWL5OjBw9F7b0Jff',
      id: '-KMxXGKkC720A5sK12aO',
      class:
       FitnessClassModel {
         name: 'Pilates',
         description: 'A boring class',
         id: '-KMxmWL5OjBw9F7b0Jff' },
      user: UserModel { name: 'Adam Duren', id: '-KMyfwVRhbGq8gpNKsaw' } },
    ReservationModel {
      userId: '-KMyfwVRhbGq8gpNKsaw',
      classId: '-KMxR_Ef6Dvp9AkMJ-xG',
      id: '-KMxhtr-38hApblkJu0f',
      user: UserModel { name: 'Adam Duren', id: '-KMyfwVRhbGq8gpNKsaw' },
      class:
       FitnessClassModel {
         name: 'Yoga',
         description: 'A relaxing fun class',
         id: '-KMxR_Ef6Dvp9AkMJ-xG' } },
    ReservationModel {
      userId: '-KMyfwVRhbGq8gpNKsaw',
      classId: '-KMxR_Ef6Dvp9AkMJ-xG',
      id: '-KMxmyzukWO1teni5oUk',
      user: UserModel { name: 'Adam Duren', id: '-KMyfwVRhbGq8gpNKsaw' },
      class:
       FitnessClassModel {
         name: 'Yoga',
         description: 'A relaxing fun class',
         id: '-KMxR_Ef6Dvp9AkMJ-xG' } } ]
```

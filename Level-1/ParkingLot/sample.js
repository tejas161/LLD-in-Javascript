import { VehicleType, Car, Motorcycle, ParkingSpot, Level, ParkingLot } from './index.js';

const createLevel = (levelNumber) => {
  const types = [VehicleType.CAR, VehicleType.MOTORCYCLE, VehicleType.TRUCK];
  const spots = [];
  for (let i = 0; i < 6; i++) {
    const type = types[i % types.length]; // Distribute types
    spots.push(new ParkingSpot(`L${levelNumber}-S${i + 1}`, type));
  }
  return new Level(levelNumber, spots);
};

const parkingLot = new ParkingLot([createLevel(1), createLevel(2)]);

const car1 = new Car("KA-01-HH-1234");
const bike1 = new Motorcycle("KA-01-HH-9999");

const spotInfo1 = parkingLot.assignSpot(car1);
const spotInfo2 = parkingLot.assignSpot(bike1);

console.log(parkingLot.getAvailability());

parkingLot.releaseSpot(spotInfo1.level, spotInfo1.spotId);

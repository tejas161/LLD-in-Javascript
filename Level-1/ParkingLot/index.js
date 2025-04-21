// Enum-like VehicleType
const VehicleType = {
  CAR: 'CAR',
  MOTORCYCLE: 'MOTORCYCLE',
  TRUCK: 'TRUCK',
};

// Base Vehicle Class
class Vehicle {
  constructor(plateNumber, type) {
    this.plateNumber = plateNumber;
    this.type = type;
  }
}

class Car extends Vehicle {
  constructor(plateNumber) {
    super(plateNumber, VehicleType.CAR);
  }
}

class Motorcycle extends Vehicle {
  constructor(plateNumber) {
    super(plateNumber, VehicleType.MOTORCYCLE);
  }
}

class Truck extends Vehicle {
  constructor(plateNumber) {
    super(plateNumber, VehicleType.TRUCK);
  }
}

// Parking Spot
class ParkingSpot {
  constructor(id, type) {
    this.id = id;
    this.type = type;
    this.vehicle = null;
  }

  isAvailable() {
    return this.vehicle === null;
  }

  canFitVehicle(vehicle) {
    return this.type === vehicle.type;
  }

  park(vehicle) {
    if (this.canFitVehicle(vehicle) && this.isAvailable()) {
      this.vehicle = vehicle;
      return true;
    }
    return false;
  }

  release() {
    const vehicle = this.vehicle;
    this.vehicle = null;
    return vehicle;
  }
}

// Level (collection of spots)
class Level {
  constructor(levelNumber, spots) {
    this.levelNumber = levelNumber;
    this.spots = spots; // array of ParkingSpot
  }

  findSpot(vehicle) {
    for (let spot of this.spots) {
      if (spot.canFitVehicle(vehicle) && spot.isAvailable()) {
        return spot;
      }
    }
    return null;
  }

  parkVehicle(vehicle) {
    const spot = this.findSpot(vehicle);
    if (spot) {
      spot.park(vehicle);
      return spot;
    }
    return null;
  }

  releaseSpot(spotId) {
    const spot = this.spots.find(s => s.id === spotId);
    if (spot) {
      return spot.release();
    }
    return null;
  }

  getAvailableSpots() {
    return this.spots.filter(spot => spot.isAvailable());
  }
}

// ParkingLot - contains all levels
class ParkingLot {
  constructor(levels) {
    this.levels = levels; // array of Level
  }

  assignSpot(vehicle) {
    for (let level of this.levels) {
      const spot = level.parkVehicle(vehicle);
      if (spot) {
        console.log(`Vehicle parked at Level ${level.levelNumber}, Spot ${spot.id}`);
        return { level: level.levelNumber, spotId: spot.id };
      }
    }
    console.log("No spot available");
    return null;
  }

  releaseSpot(levelNumber, spotId) {
    const level = this.levels.find(l => l.levelNumber === levelNumber);
    if (level) {
      level.releaseSpot(spotId);
      console.log(`Spot ${spotId} at Level ${levelNumber} is now free.`);
    }
  }

  getAvailability() {
    return this.levels.map(level => ({
      level: level.levelNumber,
      available: level.getAvailableSpots().length
    }));
  }
}

export { VehicleType, Car, Motorcycle, ParkingSpot, Level, ParkingLot };
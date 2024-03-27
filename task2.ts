const pickupPoints = ['A', 'B'];
const dropPoints = ['C', 'D'];
const trips1 = [
    ['A', 'W'],
    ['B', 'W'],
    ['W', 'C'],
    ['W', 'D']
];
const trips2 = [
    ['A', 'W1'],
    ['B', 'W2'],
    ['W3', 'C'],
    ['W4', 'D']
];

function areTripsValid(pickupPoints: string[], dropPoints: string[], trips: string[][]) {
    let warehousesMap = new Map<string, number>();
    const visited = new Set<string>();
    const pickupPointSet = new Set(pickupPoints);
    const dropPointsSet = new Set(dropPoints);

    for (let i = 0; i < trips.length; i++) {
        let trip = trips[i];

        for (let j = 0; j < trip.length; j++) {
            let point = trip[j];

            if (point[0] === 'W') {
                if (j === 0) {
                    // Must have previously visited this warehouse
                    if (!warehousesMap.has(point)) {
                        return false;
                    } else {
                        warehousesMap.set(point, warehousesMap.get(point) - 1);
                    }
                    
                } else if (j === trip.length - 1) {
                    if (!warehousesMap.has(point)) {
                        warehousesMap.set(point, 1);
                    } else {
                        warehousesMap.set(point, warehousesMap.get(point) + 1);
                    }
                }
            } else {
                // Must start at pickup point or continue a warehouse trip
                if (j === 0 && dropPointsSet.has(point)) {
                    return false;
                }

                // Cannot revisit point or go to invalid point
                if (visited.has(point) || (!pickupPointSet.has(point) && !dropPointsSet.has(point))) {
                    return false;
                } else {
                    visited.add(point);
                }
            }
        }
    }

    // Assumes a pickup point cannot be a drop point and vice versa
    if (visited.size != pickupPoints.length + dropPoints.length) {
        return false;
    }

    const warehousesValues = Array.from(warehousesMap.values());

    // Must have gone to and from each warehouse
    for (let v of warehousesValues) {
        if (v !== 0) {
            return false;
        }
    }

    return true;
}

console.log(areTripsValid(pickupPoints, dropPoints, trips1));
console.log(areTripsValid(pickupPoints, dropPoints, trips2));

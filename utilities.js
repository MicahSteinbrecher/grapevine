function prepareResults(events) {
    return removeDuplicateLocations(events);
}

function removeDuplicateLocations(events) {
    var results = [];
    var locations = new Map();
    for (var i = 0; i < events.length; i++) {
        var location = new Location( events[i].venue.location.latitude, events[i].venue.location.longitude);
        var key = location.toString();
        if (!locations.has(key)) {
            locations.set(key, events[i].id);
            results.push(events[i]);
        }
    }
    return {'results':results, 'events': results.length};
}

class Location {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
    toString() {
        return '(' + this.latitude + ', ' + this.longitude + ')';
    }
}

module.exports = {
    prepareResults: prepareResults
}
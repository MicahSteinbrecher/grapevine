function prepareResults(events) {
    events = removeDuplicateLocations(events);
    return addEventDateTime(events);
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
    return results;
}

function addEventDateTime(events){
    for (var i = 0; i < events.length; i++) {
        console.log(i);
        console.log(events[i]);
        events[i].time = getEventDateTime(events[i].startTime, events[i].endTime);
    }
    return {'results': events, events: events.length}
}

function getEventDateTime(start, end){
    start = start.split("T");
    var startTime = start[1].split("-")[0];
    var startDate = start[0];

    if (end) {
        end = end.split("T");
        var endTime = end[1].split("-")[0];
        return (startDate + ': ' + startTime + ' - ' + endTime);
    } else {
        return (startDate + ': ' + startTime);
    }
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
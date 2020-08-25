class Utils {

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    inRange(x, MIN, MAX) {
        //const MIN = -1000;
        //const MAX = 1000;
        return ((x - MIN) * (x - MAX) <= 0);
    };

    suffixPosition(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + 'st';
        }
        if (j == 2 && k != 12) {
            return i + 'nd';
        }
        if (j == 3 && k != 13) {
            return i + 'rd';
        }
        return i + 'th';
    };

};

module.exports = Utils;

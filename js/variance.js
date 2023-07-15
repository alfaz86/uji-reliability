function VAR(data) {
    var n = data.length;
    var mean = calculateMean(data);

    var sum = 0;
    for (var i = 0; i < n; i++) {
        sum += Math.pow(data[i] - mean, 2);
    }

    var variance = sum / (n - 1);
    return variance;
}

function calculateMean(data) {
    var n = data.length;
    var sum = 0;

    for (var i = 0; i < n; i++) {
        sum += data[i];
    }

    var mean = sum / n;
    return mean;
}
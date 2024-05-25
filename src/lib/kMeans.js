//selects k random points to be centroids
export function initializeCentroids(data, k) {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0,k);
}

export function assignClusters(data, centroids, xVar, yVar) {
    data.forEach(point => {
        let minDist = Infinity;
        let label = -1;
        centroids.forEach((centroid, i) => {
            const dist = Math.hypot(point[xVar] - centroid[xVar], point[yVar] - centroid[yVar]);
            if (dist < minDist) {
                minDist = dist;
                label = i;
            }
        });
        point['Cluster'] = label;
    })
}

export function updateCentroids(data, xVar, yVar, k) {
    const newCentroids = Array.from({ length: k }, () => [0,0]);
    const counts = Array.from({ length: k }, () => 0);
    
    data.forEach((point, i) => {
        const label = point['Cluster'];
        newCentroids[label][xVar] += point[xVar];
        newCentroids[label][yVar] += point[yVar];
        counts[label] += 1;
    })

    newCentroids.forEach((centroid, i) => {
        centroid[xVar] /= counts[i];
        centroid[yVar] /= counts[i];
    });

    return newCentroids;
}
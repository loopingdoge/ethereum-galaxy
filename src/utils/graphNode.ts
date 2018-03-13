/**
 * Based on octree search results tries to find index of a point which is
 * nearest to the ray in z-direction, and is closer than maxDistanceFromRay
 */

export { getNearestId, colorNode }

function getNearestId(
    allPoints: Int32Array,
    intersectedIndexes: any,
    ray: any,
    maxDistanceFromRay: number
) {
    if (intersectedIndexes.length === 0) {
        return
    }

    // This is not necessary the fastest solution, but in practice it is very fast
    intersectedIndexes.sort(byProximityToRay)

    var candidate = intersectedIndexes[0]

    if (getDistanceToRay(candidate) < maxDistanceFromRay) {
        return candidate
    }

    // No point is closer than maxDistanceFromRay, return undefined answer
    return

    function byProximityToRay(x: number, y: number) {
        var distX = getDistanceToRay(x)
        var distY = getDistanceToRay(y)
        return distX - distY
    }

    function getDistanceToRay(idx: number) {
        var x = allPoints[idx]
        var y = allPoints[idx + 1]
        var z = allPoints[idx + 2]

        var dx = ray.direction.x * (x - ray.origin.x)
        var dy = ray.direction.y * (y - ray.origin.y)
        var dz = ray.direction.z * (z - ray.origin.z)

        var directionDistance = dx + dy + dz
        var vx = ray.direction.x * directionDistance + ray.origin.x
        var vy = ray.direction.y * directionDistance + ray.origin.y
        var vz = ray.direction.z * directionDistance + ray.origin.z

        return (vx - x) * (vx - x) + (vy - y) * (vy - y) + (vz - z) * (vz - z)
    }
}

function colorNode(nodeId: number, colors: any, color: number) {
    const colorOffset = nodeId / 3 * 4
    colors[colorOffset + 0] = (color >> 24) & 0xff
    colors[colorOffset + 1] = (color >> 16) & 0xff
    colors[colorOffset + 2] = (color >> 8) & 0xff
    colors[colorOffset + 3] = color & 0xff
}

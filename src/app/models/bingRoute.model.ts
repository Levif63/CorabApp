export interface BingRoute {
  statusCode: string;
  statusDescription: string;
  resourceSets: ResourceSets[];
}

export interface ResourceSets {
    0: FirstNode[];
}

export interface FirstNode {
    estimatedTotal : string;
    resources: Resources[];
}

export interface Resources {
    0: SecondeNode[];
}

export interface SecondeNode {
    distanceUnit: string;
    durationUnit: string;
    travelDistance: string;
    travelDuration: string;
    travelDurationTraffic: string;
}

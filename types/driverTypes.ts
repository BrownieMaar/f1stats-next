export type Driver = {
    driverId: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
    permanentNumber?: string;
    code?: string;
}

export type DriverStandingInSeason = {
    season: string;
    position: string;
    points: string;
    wins: string;
    constructorName: string;
}
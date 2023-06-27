"use client";

import { Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { DriverStandingInSeason } from "@/types/driverTypes"
import Link from "next/link";

const getSeasons = async (driverId: string) => {
    const response = await fetch(`https://ergast.com/api/f1/drivers/${driverId}/driverStandings.json?limit=1000`);
    const data = await response.json();
    return data.MRData.StandingsTable.StandingsLists.map((standingResp: any) => {
        return {
            season: standingResp.season,
            position: standingResp.DriverStandings[0].position,
            points: standingResp.DriverStandings[0].points,
            wins: standingResp.DriverStandings[0].wins,
            constructorName: standingResp.DriverStandings[0].Constructors[0].name
        } as DriverStandingInSeason
    }) as DriverStandingInSeason[];
}

export default function SeasonsByDriver({ driverId }: { driverId: string }) {
    const [standingsList, setStandingsList] = useState<null | DriverStandingInSeason[]>(null);

    useEffect(() => {
        getSeasons(driverId).then(setStandingsList);
    }, []);

    return <TableContainer component={Paper} elevation={4}>
        <Table aria-label="driver results from seasons" size="small" sx={{minWidth: 400}}>
            <TableHead>
                <TableRow >
                    <TableCell>Season</TableCell>
                    <TableCell>Result</TableCell>
                    <TableCell>Points</TableCell>
                    <TableCell>Wins</TableCell>
                    <TableCell>Constructor</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {standingsList
                    ? standingsList?.map((standing) => (
                        <TableRow key={standing.season}>
                            <TableCell><Link href={"/season/" + standing.season}><b>{standing.season}</b></Link></TableCell>
                            <TableCell>{standing.position}</TableCell>
                            <TableCell>{standing.points}</TableCell>
                            <TableCell>{standing.wins}</TableCell>
                            <TableCell><Link href={"/constructor/" + standing.constructorName}><b>{standing.constructorName}</b></Link></TableCell>
                        </TableRow>
                    ))
                    : new Array(3).fill(0).map((_, i) => (
                        <TableRow key={"placeholder for " + i}>
                            <TableCell><Skeleton /></TableCell>
                            <TableCell><Skeleton /></TableCell>
                            <TableCell><Skeleton /></TableCell>
                            <TableCell><Skeleton /></TableCell>
                            <TableCell><Skeleton /></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </TableContainer>
}
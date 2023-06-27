import { Driver } from "@/types/driverTypes";
import Link from "next/link";
import SeasonsByDriver from "./SeasonsByDriver";
import styles from "../driver.module.css"

async function getDriver(driverId: string) {
    const response = await fetch(`http://ergast.com/api/f1/drivers/${driverId}.json`);
    const data = await response.json();
    return data.MRData.DriverTable.Drivers[0] as Driver;
}

export default async function Driver({params}: any) {
    const driverId = params.id;
    const driver = await getDriver(driverId);

    return !driver ? <div>Driver not found</div> : <DriverInfo driver={driver} />
}

function DriverInfo({ driver }: { driver: Driver }) {
    return (
        <div className={styles.info}>
            <div>
                <h1>
                    {driver.givenName + " " + driver.familyName}
                    <span className="f1year" style={{marginLeft: 20}}>{driver.permanentNumber ?? ""}</span>
                </h1>
            </div>
            <div>
                <div>{driver.nationality} driver</div>
                <div>Date of birth: <i>{driver.dateOfBirth}</i></div>
                {driver.code && <div>Code: <b>{driver.code}</b></div>}
                <div><b>
                    <Link href={driver.url} target="_blank">Wiki page</Link>
                </b></div>
            </div>
            <div className={styles.seasons}>
                <h2>Seasons:</h2>
                <SeasonsByDriver driverId={driver.driverId} />
            </div>
        </div>
    )
}
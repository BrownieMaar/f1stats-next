import { Driver } from "@/types/driverTypes";
import styles from "./driver.module.css";
import Link from "next/link";
import { useSearchParams } from 'next/navigation'

async function getDrivers(page: number = 1) {
    const response = await fetch(`http://ergast.com/api/f1/drivers.json?limit=30&offset=${page * 30 - 30}`);
    const data = await response.json();
    return data.MRData.DriverTable.Drivers as Driver[];
}

export default async function Drivers() {
    const drivers = await getDrivers();

    return <div className={styles["cont-flex"]}>
        {
        drivers.map(driver => (
            <DriverCard driver={driver} key={driver.driverId} />
        ))
    }
    </div>
}

function DriverCard({ driver }: { driver: Driver }) {
    return (
        <Link href={"/driver/" + driver.driverId} className={styles.card}>
            <div>
                <div><b>{driver.givenName + " " + driver.familyName}</b></div>
                <div className="f1year">{driver.permanentNumber ?? ""}</div>
            </div>
            <div>
                <div>{driver.nationality}</div>
                <div><i>{driver.dateOfBirth}</i></div>
            </div>
        </Link>
    )
}
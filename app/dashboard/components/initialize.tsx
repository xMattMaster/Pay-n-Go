import * as React from 'react';

async function DashboardInitialize(user_id: string)
{
    let data = {
        accountResponse: "",
        vehiclesResponse: {
            vehicles: "",
            usableDevices: ""
        },
        tripsResponse: "",
        paymentsResponse: ""
    };

    let accountParams = {
        "user_id": user_id
    };
    let accountParams_json = JSON.stringify(accountParams);
    data.accountResponse = await accountPHP(accountParams_json);
    
    let paymentsParams = {
        "user_id": user_id
    };
    let paymentsParams_json = JSON.stringify(paymentsParams);
    data.paymentsResponse = await paymentsPHP(paymentsParams_json);

    let vehiclesParams = {
        "user_id": user_id
    };
    let vehiclesParams_json = JSON.stringify(vehiclesParams);
    data.vehiclesResponse.vehicles = await vehiclesPHP(vehiclesParams_json);
    data.vehiclesResponse.usableDevices = await vehiclesModifyGetUsableDevicesPHP(vehiclesParams_json);

    let tripsParams = {
        "user_id": user_id
    };
    let tripsParams_json = JSON.stringify(tripsParams);
    data.tripsResponse = await tripsPHP(tripsParams_json);

    return data;
}

async function accountPHP(params: string) {

    let fetchData = {
        "method": "POST",
        "body": params,
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };
    const res = await fetch('https://basidati.netsons.org/scripts/dashboard_account.php', fetchData);
    const res_final = await res.json();
    return res_final;
}

async function paymentsPHP(params: string) {

    let fetchData = {
        "method": "POST",
        "body": params,
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };
    const res = await fetch('https://basidati.netsons.org/scripts/dashboard_payments.php', fetchData);
    const res_final = await res.json();
    return res_final;
}

async function vehiclesPHP(params: string) {

    let fetchData = {
        "method": "POST",
        "body": params,
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };
    const res = await fetch('https://basidati.netsons.org/scripts/dashboard_vehicles.php', fetchData);
    const res_final = await res.json();
    return res_final;
}

async function vehiclesModifyGetUsableDevicesPHP(params: string) {

    let fetchData = {
        "method": "POST",
        "body": params,
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };
    const res = await fetch('https://basidati.netsons.org/scripts/dashboard_vehiclesModify_getUsableDevices.php', fetchData);
    const res_final = await res.json();
    return res_final;
}

async function tripsPHP(params: string) {

    let fetchData = {
        "method": "POST",
        "body": params,
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };
    const res = await fetch('https://basidati.netsons.org/scripts/dashboard_trips.php', fetchData);
    const res_final = await res.json();
    return res_final;
}

export default function ComponentDidMount(props: any){
    React.useEffect(()=>{
        DashboardInitialize(props.userId).then(data => {
            props.modifyDashboard(data);
            setInterval(() => {props.setIsLoading(false)}, 500);
        })
    }, [])
    return <div></div>
}
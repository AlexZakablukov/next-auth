import apiCall from "@/app/_lib/apiCall";

const getNotifications = async () => {
    const res = await apiCall({
        method: 'GET',
        url: '/profile/getNotifications?limit=10',
    })

    console.log('res', res)

    if(res?.code !== 200 || !res?.data || !Array.isArray(res?.data?.notifications)) {
        return null
    }

    return res.data.notifications
}

const Page = async () => {
    const notifications = await getNotifications();

    if(!notifications){
        return <>No notifications</>
    }

    return <div>
        <h1>Private page</h1>
        <h2>Notifications:</h2>
        {notifications.map((notif: any) => {
            return <div key={notif.id}>
                <div>{notif.id}</div>
                <div dangerouslySetInnerHTML={{__html: notif.text}}/>
            </div>
        })}
    </div>
}

export default Page
export function timeAgo(date){
        const now = new Date()

        const diff = Math.floor((now - new Date(date))/1000)
        if(diff < 60) return `${diff} second${diff !==1 ? "s":''} ago`

        const min = Math.floor(diff/60)
        if(min < 60) return `${min} minute${min !==1 ? "s":''} ago `

        const hour = Math.floor(min / 60)
        if(hour < 24 ) return `${hour} hour${hour !==1 ? "s":''} ago `

        const day = Math.floor( hour / 24 )
        if( day < 365) return `${day} day${day !==1 ? "s":''} ago`

        const month = Math.floor( day / 30)
        if(month < 12 ) return `${month} month${month !==1 ? 's':''} ago`

        const year = Math.floor( day / 365)
         return `${year} year${year !==1 ? "s":''} ago`
    }
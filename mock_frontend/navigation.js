const handleNav = () =>{

    const navigateCurrentUrl = () =>{
        console.log(window.location.href)
        console.log("change")
        const current = window.location.href
        window.location.assign(current)
    }

    window.addEventListener("resize", navigateCurrentUrl)

    window.addEventListener("hashchange", navigateCurrentUrl)

}

export default handleNav;
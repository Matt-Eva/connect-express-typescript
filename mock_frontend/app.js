import handleNav from "./navigation.js";

handleNav();

const fetchUser = async () => {
    const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name: "Wills"})
    })
    const user = await response.json()
    console.log(user)
}
fetchUser();









































// let socket;
// const form = document.getElementById("message-form")
// const messageChain = document.getElementById("message-chain")
// const roomB = document.getElementById("room-b")
// const roomA = document.getElementById("room-a")
// const signIn = document.getElementById("sign-in")
// const signOut = document.getElementById("sign-out")
// const getMe = document.getElementById("get-me")
// const disconnect = document.getElementById("disconnect")
// console.log(roomB)

// const connectSocket = (room) =>{
//    socket = io("http://localhost:4000", {
//         withCredentials: true,
//         query: {
//             room: room
//         }
//     })
//     socket.on("connect", () =>{
//         console.log(socket.connected)
//     })
    
//     socket.on("room", (arg) =>{
//         console.log(arg)
//     })
    
//     socket.on("broadcast", (arg) =>{
//         console.log("receiving broadcast")
//         const message = document.createElement("p")
//         message.textContent = (arg)
//         messageChain.append(message)
//     })
// }

// signIn.addEventListener("click", async () =>{
//     const res = await fetch("http://localhost:4000/login", {
//         method: "POST",
//         headers: {
//             'Content-Type': "application/json"
//         },
//         body: JSON.stringify({name: "Kevin Pollak", id: "23"}),
//         credentials: 'include'
//     })
//     const data = await res.json()
//     console.log(data)
// })

// getMe.addEventListener("click", () =>{
//     fetch("http://localhost:4000/me", {credentials: 'include'})
// })

// roomB.addEventListener("click", () =>{
//     console.log("b")
//     connectSocket("b")
// })

// roomA.addEventListener("click", () =>{
//     console.log("a")
//     connectSocket("a")
// })


// form.addEventListener("submit", (e) =>{
//     e.preventDefault()
//     socket.emit("message", e.target.message.value)
// })

// disconnect.addEventListener("click", () =>{
//     socket.disconnect()
// })

// fetch("http://localhost:4000")
//     .then(r => r.json())
//     .then(console.log)
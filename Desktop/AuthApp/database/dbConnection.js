import mongoose from "mongoose"

 export const dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to database')
    })
    .catch((err) => {
        console.log(`${err}`)
    })
}

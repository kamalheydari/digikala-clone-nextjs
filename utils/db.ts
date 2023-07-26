import mongoose, { Connection } from 'mongoose'

const connection = {
  isConnected: 0,
}

async function connect(): Promise<void> {
  if (connection.isConnected === 1) {
    console.log('already connected')
    return
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState

    if (connection.isConnected === 1) {
      console.log('use previous connection')
      return
    }

    await mongoose.disconnect()
  }

  const db: Connection = await mongoose.connect(process.env.MONGODB_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  console.log('new connection')
  connection.isConnected = db.connections[0].readyState
}

async function disconnect(): Promise<void> {
  if (connection.isConnected === 1) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect()
      connection.isConnected = 0
    } else {
      console.log('not disconnected')
    }
  }
}

const db = { connect, disconnect }
export default db

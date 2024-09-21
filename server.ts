import dotenv from 'dotenv'
dotenv.config({ path: './.env'})
import DBConnections from './mongoose';
import app from "./app";

DBConnections.connectDBLocal()
//DBConnections.connectDB()

app.set('port', (process.env.PORT || 8000))

app.listen(app.get('port'), () => {
  console.log(`Server is running on http://localhost:${app.get('port')}`);
});


import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employees';


const app = express();
app.use(express.json());
app.use(cors())
app.use('/api/employees',employeeRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> {
    console.log('Server running on port '+PORT);
})



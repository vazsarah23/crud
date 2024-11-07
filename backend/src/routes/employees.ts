import express from 'express';
import {initDB} from '../db';

const router = express.Router();

//get all employees
router.get('/', async (req, res)=>{
    const db = await initDB();
    const employees = await db.all('SELECT * FROM employees');
    res.json(employees);
});

//add a new employee
router.post('/', async (req, res)=>{
    const {name, position, dept} = req.body;
    const db = await await initDB();
    const result = await db.run('INSERT INTO employees (name, position, dept) VALUES (?, ?, ?)', [name, position, dept] );
    // res.json(result);
    res.json({ id: result.lastID})
});

//update employee
router.put('/:id' , async (req,res)=>{
    const {id} = req.params;
    const {name, position, dept} = req.body;
    const db = await initDB();
    await db.run('UPDATE employees SET name = ?, position = ?, dept = ? WHERE id = ?', [name,position,dept,id] );
    res.sendStatus(200);
})

//delete employee
router.delete('/:id', async (req,res)=>{
    const {id} = req.params;
    const db = await initDB();
    await db.run('DELETE FROM employees WHERE id = ?', id);
    res.sendStatus(200);
});

export default router;


const express = require('express');
const sessionMiddleware = require('./config/session-config');
const authRoutes = require('./routes/auth-routes');
const taskRoutes = require('./routes/task-routes');
const stateRoutes = require('./routes/state-routes');
const priorityRoutes = require('./routes/priority-routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
// app.use(sessionMiddleware); Esta feature quedara postergada a una futura iteracion

// console.log("INDEX, SESSIONMIDDLEWARE ->", {sessionMiddleware}); Esta feature quedara postergada a una futura iteracion

// Rutas
// app.use('/api/auth', authRoutes); Esta feature quedara postergada a una futura iteracion, no es requerida actualmente.
app.use('/api/task', taskRoutes);
app.use('/api/state', stateRoutes);
app.use('/api/priority', priorityRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
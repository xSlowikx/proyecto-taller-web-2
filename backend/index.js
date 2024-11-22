const express = require('express');
const sessionMiddleware = require('./config/session-config');
const authRoutes = require('./routes/auth-routes');
const taskRoutes = require('./routes/task-routes');
const stateRoutes = require('./routes/state-routes');
const priorityRoutes = require('./routes/priority-routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(
  cors({
    origin: "http://localhost:4200", 
    credentials: true, 
  })
);

app.use(express.json());

app.use('/api/task', taskRoutes);
app.use('/api/state', stateRoutes);
app.use('/api/priority', priorityRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
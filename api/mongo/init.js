// Create user
dbAdmin = db.getSiblingDB('admin');
dbAdmin.createUser({
  user: _getEnv('MONGO_USERNAME'),
  pwd: cat(_getEnv('MONGO_PASSWORD')),
  roles: [{ role: 'userAdminAnyDatabase', db: 'portalDB' }],
});

// Authenticate user
dbAdmin.auth({
  user: _getEnv('MONGO_USERNAME'),
  pwd: cat(_getEnv('MONGO_PASSWORD')),
  digestPassword: true,
});

// Create DB and collection
db = new Mongo().getDB('portalDB');
db.createCollection('users', { capped: false });
console.log('completed');

module.exports = {
    port: process.env.PORT || 3000,
    db:{
        url: process.env.DATABASE_URL,
        database: process.env.DB_NAME || 'vue-job-portal',
        user: process.env.DB_USER || 'dpwoods',
        password: process.env.DB_PASS || 'pimpjuice',
        dialect: process.env.DIALECT || 'postgres',
        host: process.env.HOST || 'localhost'

    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}
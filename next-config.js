
const {PHASE_DEVELOPMENT_SERVER} = require('next/constants')

module.export = (phase) => {
    if(phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                MONGO_USER = 'admin',
                MONGO_PASS = '7MiqZodHbCYE8hwT',
                MONGO_DB = 'my-site-dev',
                MONGO_CLUSTER = 'cluster0'
            }
        }    
    }
    return {
        env: {
            MONGO_USER = 'admin',
            MONGO_PASS = '7MiqZodHbCYE8hwT',
            MONGO_DB = 'my-site',
            MONGO_CLUSTER = 'cluster0'
        }
    }
}
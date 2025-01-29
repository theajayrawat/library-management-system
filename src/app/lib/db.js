const {DB_USER_NAME, DB_PASSWORD, DATABASE_NAME} = process.env;
export const DBString = "mongodb+srv://"+DB_USER_NAME+":"+DB_PASSWORD+"@cluster0.uivvy1k.mongodb.net/"+DATABASE_NAME;
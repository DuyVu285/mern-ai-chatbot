import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
connectToDatabase()
    .then(() => {
    app.listen(5000, () => console.log("Server started on port 5000"));
})
    .catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map
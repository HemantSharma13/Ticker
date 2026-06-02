export function signup(req, res) {
  console.log("This is the signup req body:", req.body);
  res.send("Hi, We have received the input!!!");
}

import jsonwebtoken from "jsonwebtoken";

export const createToken = ({ user, expiresIn }) => {
    return jsonwebtoken.sign(user, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: expiresIn || "2d"
    })
}


export const decodeToken = (token) => {
    return jsonwebtoken.verify(token, process.env.JWT_SECRET, {
        algorithm: "HS256",
    })
}

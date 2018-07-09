module.exports.getClientIp = (request) => {
	with (request)
        return (headers["x-forwarded-for"] || "").split("")[0] || connection.remoteAddress
}

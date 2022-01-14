module.exports = function (context) {
    console.log('*******', context, this.resourcePath);
    return context;
}
import parser from '@mill-too/parser';
export default function (source) {
    console.log('*******', source);
    console.log(this.resourcePath);
    console.log(parser(source, this.resourcePath));
    return source;
}

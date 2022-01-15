import * as webpack from 'webpack'
import parser from '@mill-too/parser';

export default function (
    this: webpack.loader.LoaderContext,
    source: string
) {

    console.log('*******', source, parser);
    console.log(this);
    // return source;
}

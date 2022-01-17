import * as webpack from 'webpack'
import parser from '@mill-too/parser';

export default function (
    this: webpack.loader.LoaderContext,
    source: string
) {
    const templateSource = (source.match(/<template>([\s\S])*<\/template>/g) || [])[0];
    const parserTemplate = parser(templateSource, this.resourcePath)
    return source.replace(/<template>([\s\S])*<\/template>/g, parserTemplate);
}

const preactCliSvgLoader = (config, helpers) => {
    const urlLoader = helpers.getLoadersByName(config, 'url-loader')
    urlLoader.map(entry => entry.rule.test = /\.(woff2?|ttf|eot|jpe?g|png|gif|mp4|mov|ogg|webm)(\?.*)?$/i)

    const fileLoader = helpers.getLoadersByName(config, 'file-loader')
    fileLoader.map(entry => entry.rule.test = /\.(woff2?|ttf|eot|jpe?g|png|gif|mp4|mov|ogg|webm)(\?.*)?$/i)

    const rawLoader = helpers.getLoadersByName(config, 'raw-loader')
    rawLoader.map(entry => entry.rule.test = /\.(xml|html|txt|md)$/)

    const rules = config.module.rules ? config.module.rules : config.module.loaders

    rules.push({
        test: /\.svg$/,
        issuer: /\.jsx?$/, // only js
        use: ['preact-svg-loader']
    })
  
    rules.push({
        test: /\.svg$/,
        issuer: /.*(?<!\.jsx?)$/, // other than js (probably styles)
        use: ['url-loader']
    })
}

module.exports = preactCliSvgLoader

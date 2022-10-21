
> ## 인터넷 익스플로러 10 이상 지원 설정 
### ./webpack.config.ts 파일 babel-loader presets 설정 추가 
```
 module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: { browsers: ['IE 10'] },
                                debug: isDevelopment,
                            },
                        ],
                        '@babel/preset-react',
                        '@babel/preset-typescript',
                    ],
                    env: {
                  ...
```

### 메타태그 content 설정 "IE=edge" 설정
```
 ... 
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
 ...
```

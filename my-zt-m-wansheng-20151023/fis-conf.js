<!--param start-->
    //修改cdn的绝对路径（测试环境）
    fis.config.set('cdn-path','http://test.nie.163.com/test16/wyh/my_wansheng/m/');
    //修改cdn的绝对路径（正式环境）
    fis.config.set('cdn-path-release','http://res.my.netease.com/zt/2015/wsj/m/');
    //修改雪碧图放大缩小倍数，默认是1，iphone是0.5
    fis.config.set('css-scale',1);
    //修改include文件的域名
    fis.config.set('include-host','http://my.163.com/');
<!--end-->

fis.config.set('project.charset', 'gb2312');
fis.config.set('project.include', 'src/**');

fis.config.merge({
    modules : {
        parser : {
            less : 'less'
        },
        postpackager : 'simple,supply',
        postprocessor :{
            html : 'include',
            js : 'replace'
        },
        spriter : 'csssprites'
    },
    settings : {
        postpackager : {
            simple : {
                autoCombine : true
            }
        },
        postprocessor : {
            include : {
                host : fis.config.get('include-host'),
                debug : true,
                release : false,
                encode : 'gbk'
            },
            replace : {
                debug_cdn : fis.config.get("cdn-path"),
                release_cdn : fis.config.get("cdn-path-release")
            }
        },
        spriter:  {
            csssprites : {
                margin: 0,
                //图片缩放比例，iphone为0.5，默认1
                scale: fis.config.get('css-scale'),
                layout: 'matrix'
            }
        }
    },
    roadmap : {
        ext: {
            less: 'css'
        },
        domain : fis.config.get('cdn-path'),
        path : [
            {
                reg: /^\/src\/css\/_.*\.(css|less)/i,
                release: false,
                useHash: false
            },
            {
                reg : /^\/src\/(.*\.html)$/i,
                useCache : false,
                release : '$1'
            },
            {
                reg : /^\/src\/js\/(.*\.js)$/i,
                release : 'js/$1'
            },
            {
                reg : /^\/src\/css\/(.*\.less)$/i,
                release : 'css/$1',
                useSprite: true
            },
            {
                reg : /^\/src\/css\/(.*\.css)$/i,
                release : 'css/$1',
                useSprite: true
            },
            {
                reg : /^\/src\/css\/(.*\.png)$/i,
                release : 'img/spriter/$1',
                useSprite: true
            },
            {
                reg : /^\/src\/img\/(.*)$/i,
                release : 'img/$1'
            },
            {
                reg : /^\/src\/images\/(.*)$/i,
                release : 'images/$1'
            },
            {
                reg : /^\/src\/pic\/(.*)$/i,
                release : 'pic/$1'
            },
            {
                reg : /^\/src\/data\/(.*)$/i,
                release : 'data/$1',
                useDomain : true,
                useHash : false
            },
            {
                reg : /^\/src\/json\/(.*)$/i,
                release : 'json/$1',
                useDomain : false,
                useHash : false
            },
            {
                reg : '**.js',
                release : '$&'
            },
            {
                reg : '**.css',
                release : '$&',
                useSprite: true
            },
            {
                reg : '**',
                release : false
            }
        ]
    },
    deploy : {
        dist : {
            to : './dist',
            exclude : /\/include\//i,
        },
        release : {
            to : './release',
            exclude : /\/include\//i,
            replace : {
                from : fis.config.get('cdn-path'),
                to : fis.config.get('cdn-path-release')
            }
        }
    }
});
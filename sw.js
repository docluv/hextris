const preCacheName = "pre-cache-hextris-v2",
    preCacheFiles = [
        "/",
        "https://fonts.googleapis.com/css?family=Exo+2",
        "style/fa/css/font-awesome.min.css",
        "style/style.css",
        "vendor/hammer.min.js",
        "vendor/js.cookie.js",
        "vendor/jsonfn.min.js",
        "vendor/keypress.min.js",
        "vendor/jquery.js",
        "js/save-state.js",
        "js/view.js",
        "js/wavegen.js",
        "js/math.js",
        "js/Block.js",
        "js/Hex.js",
        "js/Text.js",
        "js/comboTimer.js",
        "js/checking.js",
        'js/update.js',
        'js/render.js',
        "js/input.js",
        "js/main.js",
        "js/initialization.js",
        "vendor/sweet-alert.min.js",
        "images/facebook-opengraph.png",
        "images/twitter-opengraph.png",
        "images/btn_back.svg",
        "images/btn_facebook.svg",
        "images/btn_help.svg",
        "images/btn_pause.svg",
        "images/btn_restart.svg",
        "images/btn_resume.svg",
        "images/btn_share.svg",
        "images/btn_twitter.svg",
        "images/icon_arrows.svg"
    ];


self.addEventListener( "install", event => {

    console.log( "installing precache files" );

    caches.open( preCacheName ).then( function ( cache ) {

        return cache.addAll( preCacheFiles );

    } );

} );

self.addEventListener( "activate", event => {

    event.waitUntil(

        caches.keys().then( cacheNames => {

            cacheNames.forEach( value => {

                if ( value.indexOf( "-v2" ) < 0 ) {
                    caches.delete( value );
                }

            } );

            console.log( "service worker activated" );

            return;

        } )

    );

} );


self.addEventListener( "fetch", event => {

    event.respondWith(

        caches.match( event.request ).then( response => {

            if ( !response ) {

                //fall back to the network fetch
                return fetch( event.request )
                then( response => {

                    caches.cache( "dynamic" ).cache( response.clone() );

                    return response;

                } );

            }

            return response;

        } )

    );

} );
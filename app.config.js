const APP_VARIANT = process.env.APP_VARIANT ?? 'development';

const IS_PRODUCTION = APP_VARIANT === 'production';
const APP_NAME = IS_PRODUCTION ? 'app_name' : `app_name (${APP_VARIANT})`;
const APP_ID = IS_PRODUCTION
    ? 'com.app_name.app'
    : `com.app_name.app.${APP_VARIANT}`;

module.exports = {
    name: APP_NAME,
    slug: 'slug',
    owner: 'owner',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
        image: './assets/splash-screen.png',
        resizeMode: 'cover',
        backgroundColor: '#0b0b0b'
    },
    runtimeVersion: {
        policy: 'sdkVersion'
    },
    updates: {
        fallbackToCacheTimeout: 0,
        url: 'https://u.expo.dev/<project_id>'
    },
    assetBundlePatterns: ['**/*'],
    ios: {
        supportsTablet: true,
        bundleIdentifier: APP_ID
    },
    android: {
        adaptiveIcon: {
            foregroundImage: './assets/adaptive-icon.png',
            backgroundColor: '#000000'
        },
        package: APP_ID
    },
    web: {
        favicon: './assets/favicon.png'
    },
    extra: {
        apiUrl: process.env.API_URL,
        eas: {
            projectId: 'project_id'
        }
    }
};

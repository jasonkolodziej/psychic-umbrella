import cloudflareAccessPlugin, { PluginData } from '@cloudflare/pages-plugin-cloudflare-access';

export const onRequest: PagesFunction<unknown, any, PluginData> = cloudflareAccessPlugin({
	domain: 'https://test.cloudflareaccess.com',
	aud: '4714c1358e65fe4b408ad6d432a5f878f08194bdb4752441fd56faefa9b2b6f2'
});

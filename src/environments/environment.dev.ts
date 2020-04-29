// Use: 'http://localhost:8181' for local development
// Use: 'http://3.234.39.206:8181/' for server hosting
// Remember to build the app again (for all of the platform) to update the changes
export const environment = {
    mode: 'Development',
    //api_url: 'http://localhost:8181',
    api_url: 'http://3.234.39.206:8181'
}
// TODO: Remove the remote api_url eventually, just here to toggle between
// remote and local server easily during dev without needing to enable
// the different environments.